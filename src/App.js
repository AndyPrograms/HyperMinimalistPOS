import React, { useState } from 'react';

import NewCustomer from './components/NewCustomers/NewCustomer';
import CustomerTable from './components/CustomerTable/CustomerTable';
import EditSessionModal from './components/EditSessionModal/EditSessionModal';
import './App.css'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const App = () => {
  const [paidCustomers, setPaidCustomers] = useState([]);
  const [services, setServices] = useState([]);
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
    console.log([...paidCustomers, customer], "CUSTOMER LIST BACKUP")
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
      services={services}
      setServices={setServices}
      showEditModal={setEditSession}
      modalBool={editSession}
      customers={paidCustomers}
      editCustomers={setPaidCustomers}
      p={process.env.REACT_APP_P}
    >
    </EditSessionModal>
    <IconButton className="edit-session-modal" onClick={editSessionHandler}>
      <SettingsIcon sx={{ color: "grey" }} />
    </IconButton>
      <div className="flexer">
        <NewCustomer 
            onAddCustomer={addPaidCustomerHandler} 
            lineLength={paidCustomers.length}  
            setServiceName={setServiceName}
            services={services}
            setServicePrice={setServicePrice}        
            serviceName={serviceName}
            servicePrice={servicePrice}
            customerPayed={customerPayed}
            setCustomerPayed={setCustomerPayed}
            sessionEdit={editSession}
            
        />
        <CustomerTable customers={paidCustomers} />
      </div>
    </div>
  );
};

export default App;
