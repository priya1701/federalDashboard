import React, { Component } from 'react';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import FormControl from "react-bootstrap";

class Table extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeHotel = this.onChangeHotel.bind(this);
        this.onChangeCheckIn = this.onChangeCheckIn.bind(this);
        this.onChangCheckOut = this.onChangCheckOut.bind(this);
        this.urlString = '';

        state = {
            name : '',
            hotel : '',
            checkIn : '',
            checkOut : ''
        }
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

    onChangeCheckIn(e){
        this.setState({
            checkIn: e.target.value
        });
    }

    onChangeCheckOut(e){
        this.setState({
            checkOut: e.target.value
        });
    }

    onSubmit(e){
        
        this.urlString = '{"where" :{"name" : "'+this.state.name+'","hotel":'+this.state.hotel+
                            '","checkIn":'+this.state.checkIn+'","checkOut":'+this.state.checkOut+'"}}';

    }





  render() {
    <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
        <input type="text" placeholder="Guest Name" value={this.state.name} onChange={this.onChangeName}/>              
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
        <input type="text" placeholder="Hotel Name" value={this.state.hotel} onChange={this.onChangeHotel}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
        <input type="text" placeholder="Check In Date" value={this.state.checkIn} onChange={this.onChangeCheckIn}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
        <input type="text" placeholder="Check Out Date" value={this.state.checkOut} onChange={this.onChangeCheckOut}/>
        </GridItem>
    </GridContainer>
  }
}