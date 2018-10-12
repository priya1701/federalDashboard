import React, { Component } from "react";

import axios from "axios";
import {Glyphicon} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

//import Table from 'components/TableComp/MyTable';
import './dataTable.css';

class TableWithFilterData extends Component {
  constructor(props){
      super(props);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeHotel = this.onChangeHotel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.cellButton = this.cellButton.bind(this);
      this.columnClassNameFormat = this.columnClassNameFormat.bind(this);
      this.state = {
        Guests: [],
        firstName:'',
        lastName:'',
        hotel:''
      };
      console.log("State in constructor:: ",this.state);
  }

  onClickVerified(cell, row, rowIndex){
    const id=row.guestId;
    console.log("rowww", id);
  
    axios.get("http://138.68.51.48:3000/api/guest/"+id)
    .then(resp=>
      
      {
        console.log("RESpppp", resp.data);
        var newGuest = {
            firstName: resp.data.firstName,
            lastName: resp.data.lastName,
            type: resp.data.type,
            nationality: resp.data.nationality,
            hotel: resp.data.hotel,
            checkIn:resp.data.checkIn,
            checkOut: resp.data.checkOut,
            verified: resp.data.verified
        }
        console.log("StatebyId Before ",newGuest );
        newGuest.verified="VERIFIED";
        console.log("StatebyId  ",newGuest );
        axios.put("http://138.68.51.48:3000/api/guest/"+id, newGuest)
        .then(res => {
          console.log(res.data);
          alert("Verified Successfully!!");
          window.location.reload();
        });
      });
  }


  onClickRejected(cell, row, rowIndex){
    const id=row.guestId;
  
    axios.get("http://138.68.51.48:3000/api/guest/"+id)
    .then(resp=>
      {
        var newGuest = {
            firstName: resp.data.firstName,
            lastName: resp.data.lastName,
            type: resp.data.type,
            nationality: resp.data.nationality,
            hotel: resp.data.hotel,
            checkIn:resp.data.checkIn,
            checkOut: resp.data.checkOut,
            verified: resp.data.verified
        }
        console.log("StatebyId  ",newGuest );
        newGuest.verified="REJECTED";
        console.log("StatebyId  ",newGuest );
        axios.put("http://138.68.51.48:3000/api/guest/"+id, newGuest)
        .then(res => {
          console.log(res.data);
          alert("Rejected!!");
          window.location.reload();
        });
  
      });
   }
  
   cellButton(cell, row, enumObject, rowIndex) {
     return (
      <div className="btn-group">
        <button 
            className="btn btn-success"
           type="button" 
           id="verify"
           disabled={row.verified === "VERIFIED"}
           onClick={() => 
           this.onClickVerified(cell, row, rowIndex)}
        >
        <Glyphicon glyph="ok" />
        </button>
        <button 
            className="btn btn-danger"
           type="button" 
           id="reject"
           disabled={row.verified === "REJECTED"}
           onClick={() => 
           this.onClickRejected(cell, row, rowIndex)}
        >
        <Glyphicon glyph="remove" />
        </button>
      </div>
     )
  }


  columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    return fieldValue === "PENDING" ? 'td-column-pending' : (fieldValue === "VERIFIED" ? 'td-column-varified' : 'td-column-rejected');
  }



  
  
  onChangeFirstName(e){
    this.setState({
      firstName: e.target.value
    });
   }

   onChangeLastName(e){
    this.setState({
      lastName: e.target.value
    });
   }

  onChangeHotel(e){
        this.setState({
            hotel: e.target.value
        });
   }

  componentDidMount() {
    axios
      .get("http://138.68.51.48:3000/api/guest")
      .then(response => {
        const newGuests = response.data.map(c => {
          return {
            guestId: c.guestId,
            firstName: c.firstName,
            lastName: c.lastName,
            type: c.type,
            nationality: c.nationality,
            hotel: c.hotel,
            checkIn:c.checkIn,
            checkOut: c.checkOut,
            verified: c.verified
          };
        });

        // create a new "state" object without mutating
        // the original state object.
        const newState = Object.assign({}, this.state, {
          Guests: newGuests
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  onSubmit(e){
      e.preventDefault();
    //   var filteredData= [];
    //   this.setState(filteredData);
    var urlString;
    var res;
    if((this.state.firstName.length)&&(this.state.lastName.length)&&(this.state.hotel.length)){
      urlString = '{"where" :{"firstName" :"'+this.state.firstName+'","lastName" :"'+this.state.lastName+'","hotel":"'+this.state.hotel+'"}}';
    }else if(this.state.firstName.length){
        urlString = '{"where" :{"firstName" :"'+this.state.firstName+'"}}';
    }else if(this.state.lastName.length){
      urlString = '{"where" :{"lastName" :"'+this.state.lastName+'"}}';
    }else if(this.state.hotel.length){
        urlString = urlString = '{"where" :{"hotel":"'+this.state.hotel+'"}}';
    }else{
        urlString='';
    }

    if(urlString.length){
        res = encodeURI(urlString);
    axios
      .get("http://138.68.51.48:3000/api/guest?filter="+res)
      .then(response => {
        const filteredGuests = response.data.map(c => {
          return {
            guestId: c.guestId,
            firstName: c.firstName,
            lastName: c.lastName,
            type: c.type,
            nationality: c.nationality,
            hotel: c.hotel,
            checkIn:c.checkIn,
            checkOut: c.checkOut,
            verified: c.verified
          };
        });

        // create a new "state" object without mutating
        // the original state object.
        const FilteredState = Object.assign({}, this.state, {
          Guests: filteredGuests
        });

        // store the new state object in the component's state
        this.setState(FilteredState);
      })
      .catch(error => console.log(error));
    }else{
        this.componentDidMount();
    }
  }

  render() {
    return (            
        <div>
        <div style={{ margin: 20}}>
        <div xs={12} sm={12} md={3} style={{padding: 15, display:'inline'}}>
        <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirstName}/>              
        </div>
        <div xs={12} sm={12} md={3} style={{padding: 15, display:'inline'}}>
        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLastName}/>              
        </div>
        <div xs={12} sm={12} md={3} style={{padding: 15, display:'inline'}}>
        <input type="text" placeholder="Hotel Name" value={this.state.hotel} onChange={this.onChangeHotel}/>
        </div>
        <div xs={12} sm={12} md={3} style={{padding: 15, display:'inline'}}>
        <input className="btn btn-primary" type="button" value="Submit" onClick={this.onSubmit}/>
        </div>
        </div>
        <BootstrapTable data={this.state.Guests} striped={true}>
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
          <TableHeaderColumn dataField='verified' dataAlign="center" columnClassName={ this.columnClassNameFormat }>
          Verified
          </TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.cellButton}>
          Verify
          </TableHeaderColumn>
        </BootstrapTable>
        </div>
    );
  }
}

export default TableWithFilterData;
