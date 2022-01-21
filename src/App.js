import React, { useState } from 'react';

import NewCustomer from './components/NewCustomers/NewCustomer';
import CustomerTable from './components/CustomerTable/CustomerTable';
import EditSessionModal from './components/EditSessionModal/EditSessionModal';
import './App.css'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const App = () => {
  const [paidCustomers, setPaidCustomers] = useState([]);
  const [checkout, setCheckOut] = useState(false);
  const [serviceName, setServiceName] = useState("1 Hour of Services");
  const [servicePrice, setServicePrice] = useState(50.00);
  const [customerPayed, setCustomerPayed] = useState(false);
  const [nextClientNumber, setNextClientNumber] = useState(1);
  const [editSession, setEditSession] = useState(false);

  const editSessionHandler = () => {
    setEditSession(true)
  }
  
  const addPaidCustomerHandler = (customer) => {
    customer.placeInLine = placeInLineHandler(paidCustomers)
    customer.id = nextClientNumber.toString()
    customer.clientNumber = nextClientNumber
    setCheckOut(false)
    setPaidCustomers(() => {
      return [...paidCustomers, customer];
    });
    setNextClientNumber(nextClientNumber + 1)
  };

  const placeInLineHandler = (customersStillInLine) => {
    const newLine = customersStillInLine.length + 1
    return newLine.toString()
  };

  return (
    <div>
      <EditSessionModal
        setServiceName={setServiceName}
        setServicePrice={setServicePrice}
        showEditModal={setEditSession}
        modalBool={editSession}
        customers={paidCustomers}
        editCustomers={setPaidCustomers}
        // p={process.env.REACT_APP_P}
        p={"Password"}
      >
      </EditSessionModal>
      <IconButton className="edit-session-modal" onClick={editSessionHandler}>
        <SettingsIcon sx={{ color: "grey" }} />
      </IconButton>
        
      <NewCustomer 
          onAddCustomer={addPaidCustomerHandler} 
          lineLength={paidCustomers.length}           
          checkout={checkout}
          serviceName={serviceName}
          servicePrice={servicePrice}
          setCheckOut={setCheckOut}
          customerPayed={customerPayed}
          setCustomerPayed={setCustomerPayed}
          
      />
      <CustomerTable customers={paidCustomers} />
    </div>
  );
};

export default App;
