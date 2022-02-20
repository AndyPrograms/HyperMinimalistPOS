import React, { useState } from "react";
import PayPal from "../PayPal/PayPal";
import "./NewCustomerForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const getElementByID = (arr, selectedId) => {
  let result = {}
  const finder = () => {
    arr.find(x => {
      if (x.id === selectedId){
        result = x
        return true
      } return false
    }
    )
  }
  finder()
  return result
}

const NewCustomerForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [phone, setPhone] = useState("");
  const [firstValid, setFirstValid] = useState(false);
  const [lastValid, setLastValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [serviceValid, setServiceValid] = useState(false);

  
  const formatServices = () => {
    const display = (desc, price) => {
      return desc + ", $" + price
    }
    const services = props.services
    let arr = [<option value={""} key={"-1"}>Select Service</option>]
        for (let i = 0; i < services.length; i++) {
          const optionValue = display(services[i].name, services[i].price)

          arr[i+1] = <option value={services[i].id} key={i.toString()}>
            {optionValue}
          </option>
        }
        return arr
  }

  const resetVal = () => {
    setFirstValid(false)
    setLastValid(false)
    setPhoneValid(false)
    setServiceValid(false)
  }

  const firstNamePresentChecker = () => {
    if (enteredFirstName === "") {
      setFirstValid(true)
      return false
    } else
      setFirstValid(false)
      return true
  }

  const lastNamePresentChecker = () => {
    if (enteredLastName === "") {
      setLastValid(true)
      return false
    } else
      setLastValid(false)
      return true
  }

  const phoneChecker = () => {
    if (phone === "") {
      setPhoneValid(true)
      return false
    } else
      setPhoneValid(false)
      return true 
  }

  const serviceChecker = () => {
    if (selectedService === "") {
      setServiceValid(true)
      return false
    } else
      setServiceValid(false)
      return true
  }

  const checkAll = () => {
    lastNamePresentChecker()
    phoneChecker()
    serviceChecker()
    if (
        firstNamePresentChecker() && 
        lastNamePresentChecker() &&
        phoneChecker() &&
        serviceChecker()
    ) {
      return true
    }
    return false
  }

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value)
    
  }

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value)
  }

  const serviceSelectHandler = (event) => {
    setSelectedService(event.target.value)
    props.setServiceName(getElementByID(props.services, event.target.value).name)
    props.setServicePrice(getElementByID(props.services, event.target.value).price)
  }

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value)
  }

  const submitHandler = () => {
    const customerData = {
      id: "",
      firstName: enteredFirstName,
      lastName: enteredLastName,
      clientNumber: "",
      placeInLine: "",
      clientService: selectedService,
      phone: phone
    };

    props.onAddCustomerToLine(customerData);
    setEnteredFirstName("")
    setEnteredLastName("")
    setPhone("")
    setSelectedService("")
    props.setCustomerPayed(false)
    resetVal()
    
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <h3 className="new-customer-header">Purchase a place in line:</h3>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Select Service</Form.Label>
        <Form.Select 
            isInvalid={serviceValid}
            onChange={serviceSelectHandler}
            value={selectedService}
        >
            {formatServices()}
        </Form.Select>
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

      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control 
          isInvalid={phoneValid} 
          type="text" 
          placeholder="(XXX) XXX-XXXX"
          value={phone}
          onChange={phoneChangeHandler}
        />
      </Form.Group>

        <div className="paypal">
          <PayPal 

          serviceName = {props.serviceName}
          servicePrice = {props.servicePrice}
          setCustomerPayed={props.setCustomerPayed}
          onAddCustomer={props.onAddCustomer}
          submitHandler={submitHandler}
          resetVal={resetVal}
          checkAll={checkAll}
          
          >
          </PayPal>
        </div>
      
      
      { firstValid || lastValid ? 
      
        (
        <Alert className="new-customer-alert" key="validationAlert" variant="danger">
          Please Finish Entering Your Information to Continue!
        </Alert>
        ) : (
        <div></div>
      )}
    </Form>
  );
};

export default NewCustomerForm;
