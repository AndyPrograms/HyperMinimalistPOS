import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditSessionForm.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const EditSessionForm = (props) => {
    const [serviceDesc, setServiceDesc] = useState("")
    const [price, setPrice] = useState(1)
    const [numValid, setNumValid] = useState(false)
    const [serValid, setSerValid] = useState(false)
    const [priceValid, setPriceValid] = useState(false)

    const idHandler = () => {
        if (props.services[0] !== undefined) {
            return (parseInt(props.services[props.services.length - 1].id) + 1).toString()
        } else return 0
    }

    const submitHandler = () => {
        const localService = {
            id: idHandler(),
            name: serviceDesc,
            price: price,
        }
        console.log(props.services)
        if (props.services[0]) {
            props.setServices([...props.services, localService])
            props.setS("")
            return
        } else
        props.setServices([localService])
        props.setS("")
    }

    const cancelHandler = () => {
        props.setX(false)
        props.setS("")
        props.showEditModal(false)
    }

    const fieldsFilled = () => {
        setNumValid(false)
        setSerValid(false)
        setPriceValid(false)
        if (
            serviceDesc === "" ||
            serviceDesc === "Your Services Here" ||
            price < 1
        ) {
            if (serviceDesc === "" || serviceDesc === "Your Services Here"){
                setSerValid(true)
            }
            if (price < 1){
                setPriceValid(true)
            }
            
            return false
        }
        
        else 
        return true
    }

    const serviceDescChangeHandler = (event) => {
        setServiceDesc(event.target.value);
      };

    const priceChangeHandler = (event) => {
        setPrice(event.target.value);
      };

    return (
        <Form>
            <Form.Group className="mb-3">
                <h3 className="edit-header">Make Changes to Your Offered Services</h3>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label>Service Description</Form.Label>
                <Form.Control 
                isInvalid={serValid}
                type="text" 
                placeholder="Your Services Here"
                value={serviceDesc}
                onChange={serviceDescChangeHandler}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label>Service Price (USD)</Form.Label>
                <Form.Control 
                isInvalid={priceValid}
                placeholder="0.01"
                type="float"
                value={price}
                onChange={priceChangeHandler}
                step="0.01"
                min="1"
                />
            </Form.Group>
            <Button 
                variant="primary"
                type="button" 
                onClick={()=> {cancelHandler()}
            }>
                Cancel
            </Button>
            <Button 
                variant="primary"
                type="button" 
                onClick={()=> {
                    if (fieldsFilled()) {
                    submitHandler();
                    }
                }
            }>
                Submit
            </Button>
            {numValid || serValid || priceValid ? 
            
                (
                <Alert className="new-customer-alert" key="validationAlert2" variant="danger">
                    A value in an entered field is either Missing or Invalid!
                </Alert>
                ) : (
                <div></div>
            )}
        </Form>
        
    );
};

export default EditSessionForm;