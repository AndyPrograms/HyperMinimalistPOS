import React from "react";

import NewCustomerForm from "./NewCustomerForm";
import "./NewCustomer.css";

const NewCustomer = (props) => {
  


  const addNewCustomerToLineHandler = (newCustomerData) => {
    const customerData = {
      ...newCustomerData,
      id: props.lineLength.toString(),
    };
    props.onAddCustomer(customerData);

  };

  return (
    <div className="new-customer">
        <NewCustomerForm
          onAddCustomerToLine={addNewCustomerToLineHandler}
          setServicePrice={props.setServicePrice}
          setServiceName={props.setServiceName}
          serviceName={props.serviceName}
          servicePrice={props.servicePrice}
          customerPayed={props.customerPayed}
          setCustomerPayed={props.setCustomerPayed}
          onAddCustomer={props.onAddCustomer}
          sessionEdit={props.sessionEdit}
          services={props.services}
        />
    </div>
  );
};

export default NewCustomer;
