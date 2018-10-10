import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
import './MyTable.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} striped={true}>
          <TableHeaderColumn isKey dataField='guestId' dataAlign="center">
          Guest ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='firstName' dataAlign="center">
          First Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='lastName' dataAlign="center">
          Last Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataAlign="center">
          Document Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField='nationality' dataAlign="center">
          Nationality
          </TableHeaderColumn>
          <TableHeaderColumn dataField='hotel' dataAlign="center">
          Hotel Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='checkIn' dataAlign="center">
          Check In Time
          </TableHeaderColumn>
          <TableHeaderColumn dataField='checkOut' dataAlign="center">
          Check Out Time
          </TableHeaderColumn>
          <TableHeaderColumn dataField='verified' dataAlign="center">
          Verified
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table;

