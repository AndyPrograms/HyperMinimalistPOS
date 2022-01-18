import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditSessionForm.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const EditSessionForm = (props) => {
    const [timeValue, setTimeValue] = useState(1)
    const [timeType, setTimeType] = useState("")
    const [serviceDesc, setServiceDesc] = useState("")
    const [price, setPrice] = useState(1)
    const [numValid, setNumValid] = useState(false)
    const [serValid, setSerValid] = useState(false)
    const [priceValid, setPriceValid] = useState(false)
    const [typeValid, setTypeValid] = useState(false)
    
    const timeFormats = [
        "Minute",
        "Minutes",
        "Hour",
        "Hours"
    ]

    const timeFormatOptions = () => {
        let arr = [<option value={""} key={"-1"}>Select Increment</option>]
        for (let i = 0; i < timeFormats.length; i++) {
                arr[i+1] = <option value={timeFormats[i]} key={i.toString()}>{timeFormats[i]}</option>
        }
        return arr
    }

    const submitHandler = () => {
        props.setServicePrice(price)
        props.setServiceName(timeValue + " " + timeType + " of " + serviceDesc)
        props.setX(false)
        props.setS("")
        props.showEditModal(false)
    }

    const cancelHandler = () => {
        props.setX(false)
        props.setS("")
        props.showEditModal(false)
    }

    const fieldsFilled = () => {
        setNumValid(false)
        setTypeValid(false)
        setSerValid(false)
        setPriceValid(false)
        if (
            timeValue < 1 ||
            timeType === "" ||
            serviceDesc === "" ||
            serviceDesc === "Your Services Here" ||
            price < 1
        ) {
            if (timeValue < 0.01){
                setNumValid(true)
            }
            if (timeType === ""){
                setTypeValid(true)
            }
            if (serviceDesc === "" || serviceDesc === "Your Services Here"){
                setSerValid(true)
            }
            if (price < 0.01){
                setPriceValid(true)
            }
            
            return false
        }
        
        else 
        return true
    }
    
    const timeValueChangeHandler = (event) => {
        setTimeValue(event.target.value);
      };
    
    const timeTypeChangeHandler = (event) => {
        setTimeType(event.target.value);
      };

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
                <Form.Label>Length of Service</Form.Label>
                <Form.Control 
                    className="input-spacing"
                    isInvalid={numValid} 
                    placeholder={1}
                    type="number"
                    value={timeValue}
                    onChange={timeValueChangeHandler}
                    step="1"
                    min="1"
                />
                <Form.Select 
                    aria-label="Default select example" 
                    onChange={timeTypeChangeHandler}
                    isInvalid={typeValid}
                    value={timeType}
                >
                    {timeFormatOptions()}
                </Form.Select>
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
                placeholder="0.00"
                type="double"
                value={price}
                onChange={priceChangeHandler}
                step="0.01"
                min="0.01"
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