import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ReactModal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';
import '../EditSessionModal/EditSessionForm.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './CustomerTable.css'

const CustomerTableEdit = (props) => {
    const [localModalHandler, setLocalModalHandler] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")

    const headerColor = '#5024dd'

    const headerAlign = {
        textAlign: 'center',
    }

    const customTable = {
    
        width: '100%',
        margin: 'auto',
        textAlign: 'center',

    }

    const customTHMiddle = {
        width: '15%',
        backgroundColor: headerColor,
    }

    const customTHMiddleWide = {
        width: '25%',
        backgroundColor: headerColor,
    }

    const customTHLeft = {
        borderRadius: '10px 0px 0px 0px',
        borderCollapse: 'separate',
        width: '10%',
        backgroundColor: headerColor,
    }

    const customTHRight = {
        borderRadius: '0px 10px 0px 0px',
        borderCollapse: 'separate',
        width: '10%',
        backgroundColor: headerColor,
    }

    const cancelHandler = () => {
        props.setX(false)
        props.setS("")
        props.showEditModal(false)
       
    }

    const deleteFinal = () => {
        let arr = props.customers.filter(function( obj ) {
            return obj.id !== deleteId;
        });

        for (let i = 0; i < arr.length; i++) {
            arr[i].placeInLine = i + 1
        }
        
        props.editCustomers(arr)
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
            for (let i = fillNum; i < 10; i++) {
                arr[i] = 
                    <tr key={"EMPTYEDIT" + i}>
                        <td style={color(i)}>ㅤ</td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                    </tr>
            } 
        }
        if (props.customers.length > 0) {
            for (let i = 0; i < props.customers.length; i++) {
                const a = props.customers[i].clientService
                const b = props.services[a]
                arr[i] = 
                    <tr key={props.customers[i].clientNumber} className="center-text-vertical">
                        <td style={color(i)}>{props.customers[i].placeInLine}</td>
                        <td style={color(i)}>{props.customers[i].firstName + " " + props.customers[i].lastName}</td>
                        <td style={color(i)}>{b.name}</td>
                        <td style={color(i)}>{props.customers[i].phone}</td>
                        <td style={color(i)}>{props.customers[i].clientNumber}</td>
                        <td style={color(i)} className="center-icon">
                            <IconButton 
                                onClick={() => {
                                    setLocalModalHandler(true); 
                                    setDeleteId(props.customers[i].id)
                                    setDeleteName(props.customers[i].firstName + " " + props.customers[i].lastName)
                                }}
                            >
                                <DeleteForeverIcon sx={{ color: "grey" }} />
                            </IconButton>
                        </td>
                            
                    </tr>
            }
            if (props.customers.length < 10) {
                fillEmpty(props.customers.length)
            }
            return arr
        } else 
        arr[0] = 
        <tr key="EMPTYEDITLINE">
            <td style={color(0)}>ㅤ</td>
            <td style={color(0)}></td>
            <td style={color(0)}></td>
            <td style={color(0)}></td>
            <td style={color(0)}></td>
            <td style={color(0)}></td>
        </tr>
        fillEmpty(1)
        return arr
        
    }

    return (
        <div>
            <h3 style={headerAlign}>Customer Information</h3>
            <Table className="table-formater" style={customTable} borderless variant="dark">
                <thead>
                    <tr>
                        <th style={customTHLeft}>Line #</th>
                        <th style={customTHMiddle}>Name</th>
                        <th style={customTHMiddleWide}>Selected Service</th>
                        <th style={customTHMiddleWide}>Phone Number</th>
                        <th style={customTHMiddle}>Service #</th>
                        <th style={customTHRight}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData()}
                </tbody>
            </Table>
            <Button 
                variant="primary"
                type="button" 
                onClick={()=> {cancelHandler()}}
            >
                Done
            </Button>
            <div className="custom-modal">
                <ReactModal
                    className="edit-session"
                    isOpen={localModalHandler}
                    ariaHideApp={false}
                >
                    <div className="center-content">
                        <h4>Are you sure you want to remove {deleteName} from the line? This cannot be undone.</h4>
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

export default CustomerTableEdit;