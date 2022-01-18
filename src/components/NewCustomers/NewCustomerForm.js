import React, { useState } from "react";
import PayPal from "../PayPal/PayPal";
import "./NewCustomerForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


const NewCustomerForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [buttonText, setButtonText] = useState("Checkout");
  const [firstValid, setFirstValid] = useState(false);
  const [lastValid, setLastValid] = useState(false);

  const buttonTextHandler = () => {
    if (props.checkout === true){
      setButtonText("Checkout")
    }
    else setButtonText("Cancel")
  }

  const namePresentChecker = () => {
    if (enteredFirstName !== "" && enteredLastName !== ""){
      return true
    }
    else
    if (enteredFirstName === "") {
      setFirstValid(true)
    }
    if (enteredLastName === "") {
      setLastValid(true)
    }
    return false
    
  }

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const submitHandler = () => {
    const customerData = {
      id: "",
      firstName: enteredFirstName,
      lastName: enteredLastName,
      clientNumber: "",
      placeInLine: ""
    };

    props.onAddCustomerToLine(customerData);
    setEnteredFirstName("");
    setEnteredLastName("");
    props.setCustomerPayed(false);
    buttonTextHandler()
    setFirstValid(false)
    setLastValid(false)
    
  };

  const localCheckoutHandler = () => {
    if (props.checkout === false) {
      props.setCheckOut(true)
    }
    else props.setCheckOut(false)
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <h3 className="new-customer-header">Purchase a place in line for the following:</h3>
        <h4>{props.serviceName} for ${props.servicePrice}</h4>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          isInvalid={firstValid} 
          type="text" 
          placeholder="First Name"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          isInvalid={lastValid} 
          type="text" 
          placeholder="Last Name" 
          value={enteredLastName}
          onChange={lastNameChangeHandler}
        />
      </Form.Group>
      <div className="paypal">
      {props.checkout ? (
            
            <PayPal 

            serviceName = {props.serviceName}
            servicePrice = {props.servicePrice}
            setCustomerPayed={props.setCustomerPayed}
            onAddCustomer={props.onAddCustomer}
            submitHandler={submitHandler}
            
            >
            </PayPal>
          ) : (
          <div></div>
        )}
      </div>
      <Button variant="primary" type="button" 
          onClick={()=> {
            setFirstValid(false)
            setLastValid(false)
            if (namePresentChecker()) {
              localCheckoutHandler();
              buttonTextHandler();
              setFirstValid(false)
              setLastValid(false)
            }
            }}>
          {buttonText}
      </Button>
      {firstValid || lastValid ? 
      
        (
        <Alert className="new-customer-alert" key="validationAlert" variant="danger">
          Please Finish Entering Your Name to Continue!
        </Alert>
        ) : (
        <div></div>
      )}
    </Form>
  );
};

export default NewCustomerForm;
