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
          <TableHeaderColumn dataField='name' dataAlign="center">
          Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataAlign="center">
          Document Type
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
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table;

