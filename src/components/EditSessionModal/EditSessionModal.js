import React, {useState} from 'react';
import EditSessionForm from './EditSessionForm'
import CustomerTableEdit from '../CustomerTable/CustomerTableEdit'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./EditSessionForm.css"
import ReactModal from 'react-modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import IconButton from "@mui/material/IconButton";
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TryRounded from '@mui/icons-material/TryRounded';


const EditSessionModal = (props) => {
    const [x, setX] = useState(false)
    const [w, setW] = useState(false)
    const [s, setS] = useState("")
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });

    const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const mainHandler = (event) => {
        setS(event.target.value)
    }

    const vMain = (a) => {
        if (a === props.p) {
            return TryRounded
        }
        else 
        return false
    }

    const customStyles = {
        content: {
          top: '5%',
          bottom: 'auto',
          background: '#967ceb',
          border: 'none',
        },
      };

    return (
        <ReactModal
            isOpen={props.modalBool}
            style={customStyles}
            setServiceName={props.setServiceName}
            setServicePrice={props.setServicePrice}
            showEditModal={props.showEditModal}
            ariaHideApp={false}
        >
            { x ? (
                <Tabs
                    defaultActiveKey="1"
                    id="editTabs"
                    className="mb-3"
                    >
                    <Tab eventKey="1" title="Services">
                        <div className="edit-session">
                        <EditSessionForm
                            setServiceName={props.setServiceName}
                            setServicePrice={props.setServicePrice}
                            showEditModal={props.showEditModal}
                            setX={setX}
                            setS={setS}
                        >
                        </EditSessionForm>
                        </div>
                    </Tab>
                    <Tab eventKey="2" title="Line">
                        <div className="edit-session-line">
                            <CustomerTableEdit 
                                customers={props.customers}
                                editCustomers={props.editCustomers}
                                showEditModal={props.showEditModal}
                                setX={setX}
                                setS={setS}
                            >
                            </CustomerTableEdit>
                        </div>
                    </Tab>
                </Tabs> 
                ) : (
                <Form className="edit-session">
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Please Input Password to Access Session Settings</Form.Label>
                        <div className="see-pass">
                            <Form.Control 
                            isInvalid={w}
                            placeholder=""
                            type={values.showPassword ? "text" : "password"}
                            value={s}
                            onChange={mainHandler}
                            />
                            <div className="see-pass-icon">
                                <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </div>
                        </div>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        type="button" 
                        onClick={()=> {
                            if (vMain(s)) {
                            setW(false);
                            setX(true);
                            }else
                            setW(true)
                        }
                    }>
                        Submit
                    </Button>
                    <Button 
                        variant="primary"
                        type="button" 
                        onClick={()=> {
                            props.showEditModal(false)
                        }
                    }>
                        Cancel
                    </Button>
                    {w ? 
                        (
                        <Alert className="pass-alert" key="validationAlertPass" variant="danger">
                            Incorrect Password
                        </Alert>
                        ) : (
                        <div></div>
                    )}
                </Form>
            )}
        </ReactModal>
    );
};

export default EditSessionModal;

