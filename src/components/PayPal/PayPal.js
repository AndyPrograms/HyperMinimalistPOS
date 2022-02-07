import React from "react";

import ReactDOM from "react-dom"



export default function PayPal(props) {

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const style = {
        shape:   'rect',
        label:   'checkout',   
    }

    const createOrder = (data, actions) => {

        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    description: props.serviceName,
                    amount: {
                        currency_code: "USD",
                        value: props.servicePrice,
                    }
                }
            ],
            application_context:  { 
                shipping_preference: "NO_SHIPPING"
            }
        })

    };

    const onApprove = (data, actions) => {
        props.submitHandler()
        return actions.order.capture()
    };

    const onError = (data, actions, err) => {
        console.log(err)
    }

    const onClick = (data, actions) => {
        const validator = () => {
            if (props.checkAll()) {
                return true
            } else return false
        }
        return validator()
        
    };

    return (

        <PayPalButton
        style={style}
        onClick={(data, actions) => onClick(data, actions)}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onError={(data, actions, err) => onError(data, actions)}

        />

    );

    }