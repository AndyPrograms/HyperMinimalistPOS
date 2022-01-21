import React, { useRef, useEffect } from 'react'

export default function PayPal(props) {
    
    const paypal = useRef();

    const serviceName = props.serviceName
    const servicePrice = props.servicePrice

    console.log(props, "PROPS")
    console.log(serviceName, "NAME")
    console.log(servicePrice, "PRICE")

    useEffect(()=> {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: serviceName,
                                    amount: {
                                        currency_code: "USD",
                                        value: servicePrice,
                                    }
                                }
                            ]
                        })
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture()
                        console.log(order)
                        await props.submitHandler()
                    },
                    onError: (err) => {
                        console.log(err)
                    }
            }).render(paypal.current)
    }, [props, serviceName, servicePrice])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}