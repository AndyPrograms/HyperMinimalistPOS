import React, {useState} from 'react';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './CurrentServicesTable.css'
import Button from 'react-bootstrap/Button'
import ReactModal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import '../EditSessionModal/EditSessionForm.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CurrentServicesTable = (props) => {
    const [localModalHandler, setLocalModalHandler] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")

    const headerColor = '#5024dd'

    const headerAlign = {
        textAlign: 'center',
    }

    const customModal = {
        content: {
            width: '50%',
            height: 'auto',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            backgroundColor: 'white',
        }
    }

    const customTable = {
    
        width: '100%',
        margin: 'auto',
        textAlign: 'center',

    }

    const customTHMiddle = {
        width: '50%',
        backgroundColor: headerColor,
    }

    const customTHLeft = {
        borderRadius: '10px 0px 0px 0px',
        borderCollapse: 'separate',
        width: '25%',
        backgroundColor: headerColor,
    }

    const customTHRight = {
        borderRadius: '0px 10px 0px 0px',
        borderCollapse: 'separate',
        width: '25%',
        backgroundColor: headerColor,
    }

    const deleteFinal = () => {
        let arr = props.services.filter(function( obj ) {
            return obj.id !== deleteId;
        });
        
        props.setServices(arr)
        setLocalModalHandler(false)
    }

    const localCancel = () => {
        setLocalModalHandler(false)
    }

    const tableData = () =>{
        let arr = []
        const color = (n) => {
            if (n === 0 || (n % 2) === 0) {
                return {
                    backgroundColor: '#7350e4',
                }
            }
            else return {
                backgroundColor: '#967ceb',
            }
        }
        const fillEmpty = (fillNum) => {
            for (let i = fillNum; i < 5; i++) {
                arr[i] = 
                    <tr key={"EMPTYEDITSERVICE" + i}>
                        <td style={color(i)}>ㅤ</td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                    </tr>
            } 
        }
        if (props.services.length > 0) {
            for (let i = 0; i < props.services.length; i++) {
                arr[i] = 
                    <tr key={props.services[i].id} className="center-text-vertical">
                        <td style={color(i)}>${props.services[i].price}</td>
                        <td style={color(i)}>{props.services[i].name}</td>
                        <td style={color(i)} className="center-icon">
                            <IconButton 
                                onClick={() => {
                                    setLocalModalHandler(true); 
                                    setDeleteId(props.services[i].id)
                                    setDeleteName(props.services[i].name + ", $" + props.services[i].price)
                                }}
                            >
                                <DeleteForeverIcon sx={{ color: "grey" }} />
                            </IconButton>
                        </td>
                            
                    </tr>
            }
            if (props.services.length < 5) {
                fillEmpty(props.services.length)
            }
            return arr
        } else 
        arr[0] = 
        <tr key="EMPTYEDITSERVICE">
            <td style={color(0)}></td>
            <td style={color(0)}>NO SERVICES TO LIST</td>
            <td style={color(0)}></td>
        </tr>
        fillEmpty(1)
        return arr

    }

    return (
        <div>
            <h3 style={headerAlign}>ㅤ</h3>
            <Table className="table-formater" style={customTable} borderless variant="dark">
                <thead>
                    <tr>
                        <th style={customTHLeft}>Service Price</th>
                        <th style={customTHMiddle}>Service Name</th>
                        <th style={customTHRight}>Remove Service</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData()}
                </tbody>
            </Table>
            <div style={customModal}>
                <ReactModal
                    className="edit-session"
                    style={customModal}
                    isOpen={localModalHandler}
                    ariaHideApp={false}
                >
                    <div className="center-content">
                        <h4>Are you sure you want to remove {deleteName} from the your list of services? This cannot be undone.</h4>
                        <Button 
                            variant="primary"
                            type="button" 
                            onClick={()=>{deleteFinal()}}
                        >
                            Yes
                        </Button>
                        <Button 
                            variant="primary"
                            type="button" 
                            onClick={()=>{localCancel()}}
                        >
                            Cancel
                        </Button>
                    </div>
                    
                </ReactModal>
            </div>
            
        </div>
    );
};

export default CurrentServicesTable;