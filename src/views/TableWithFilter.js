import React, { Component } from "react";

import axios from "axios";

import Table from '../components/TableComp/MyTable';

class TableWithFilterData extends Component {
  constructor(props){
      super(props);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeHotel = this.onChangeHotel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        Guests: [],
        firstName:'',
        lastName:'',
        hotel:''
      };
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
        <div style={{ height: 50}}>
        <div xs={12} sm={12} md={3} style={{display:'inline'}}>
        <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirstName}/>              
       
        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLastName}/>              
        
        <input type="text" placeholder="Hotel Name" value={this.state.hotel} onChange={this.onChangeHotel}/>
        
        <input type="button" value="Submit" onClick={this.onSubmit}/>
        </div>
        </div>
        <Table data={this.state.Guests}/>
        </div>
    );
  }
}

export default TableWithFilterData;
