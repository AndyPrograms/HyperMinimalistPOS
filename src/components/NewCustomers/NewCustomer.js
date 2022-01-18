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
          checkout={props.checkout}
          serviceName={props.serviceName}
          servicePrice={props.servicePrice}
          setCheckOut={props.setCheckOut}
          customerPayed={props.customerPayed}
          setCustomerPayed={props.setCustomerPayed}
          onAddCustomer={props.onAddCustomer}
        />
    </div>
  );
};

export default NewCustomer;
