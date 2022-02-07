import React from 'react';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerTable.css'

const CustomerTable = (props) => {

    const headerColor = '#5024dd'

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
            for (let i = fillNum; i < 11; i++) {
                arr[i] = 
                    <tr key={"EMPTY" + i}>
                        <td style={color(i)}>ㅤ</td>
                        <td style={color(i)}></td>
                        <td style={color(i)}></td>
                    </tr>
            } 
        }

        if (props.customers.length > 0) {
            for (let i = 0; i < props.customers.length; i++) {
                arr[i] = 
                    <tr key={props.customers[i].clientNumber}>
                        <td style={color(i)}>{props.customers[i].placeInLine}</td>
                        <td style={color(i)}>{props.customers[i].firstName + " " + props.customers[i].lastName}</td>
                        <td style={color(i)}>{props.customers[i].clientNumber}</td>
                    </tr>
            }

            if (props.customers.length < 11) {
                fillEmpty(props.customers.length)
            }

            return arr
        } else 
            arr[0] = 
            <tr key="EMPTYLINE">
                <td style={color(0)}></td>
                <td style={color(0)}>No One is Currently in Line</td>
                <td style={color(0)}></td>
            </tr>
            fillEmpty(1)
            return arr
    }

    return (
        <div className="flex-child">
            <Table className="table-formater" style={customTable} hover borderless variant="dark">
                <thead>
                    <tr>
                        <th style={customTHLeft}>Place in Line</th>
                        <th style={customTHMiddle}>Name</th>
                        <th style={customTHRight}>Service Number</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData()}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomerTable;