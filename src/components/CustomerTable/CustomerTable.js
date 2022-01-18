import React from 'react';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerTable = (props) => {

    const headerColor = '#5024dd'

    const customTable = {
    
        width: '75%',
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
        for (let i = 0; i < props.customers.length; i++) {
            arr[i] = 
                <tr key={props.customers[i].clientNumber}>
                    <td style={color(i)}>{props.customers[i].placeInLine}</td>
                    <td style={color(i)}>{props.customers[i].firstName + " " + props.customers[i].lastName}</td>
                    <td style={color(i)}>{props.customers[i].clientNumber}</td>
                </tr>
        }
        return arr
    }

    return (
        <Table style={customTable} hover borderless variant="dark">
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
    );
};

export default CustomerTable;