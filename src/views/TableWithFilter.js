import React, { Component } from "react";

import axios from "axios";

import Table from '../components/TableComp/MyTable';

class TableWithFilterData extends Component {
  constructor(props){
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeHotel = this.onChangeHotel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        Guests: [],
        name:'',
        hotel:''
      };
  }
  
  
  onChangeName(e){
    this.setState({
        name: e.target.value
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
            name: c.name,
            type: c.type,
            checkIn:c.checkIn,
            checkOut: c.checkOut,
            hotel: c.hotel
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
    if((this.state.name.length)&&(this.state.hotel.length)){
      urlString = '{"where" :{"name" :"'+this.state.name+'","hotel":"'+this.state.hotel+'"}}';
      
    }else if(this.state.name.length){
        urlString = '{"where" :{"name" :"'+this.state.name+'"}}';
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
            name: c.name,
            type: c.type,
            checkIn:c.checkIn,
            checkOut: c.checkOut,
            hotel: c.hotel
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
        <div xs={12} sm={12} md={3}>
        <input type="text" placeholder="Guest Name" value={this.state.name} onChange={this.onChangeName}/>              
        </div>
        <div xs={12} sm={12} md={3}>
        <input type="text" placeholder="Hotel Name" value={this.state.hotel} onChange={this.onChangeHotel}/>
        </div>
        <div xs={12} sm={12} md={3}>
        <input type="button" value="Submit" onClick={this.onSubmit}/>
        </div>
        <Table data={this.state.Guests}/>
        </div>
    );
  }
}

export default TableWithFilterData;
