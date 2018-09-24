import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

import Table from './components/MyTable';

class App extends Component {
  // default state object
  state = {
    Guests: []
  };

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Federal</h1>
        </header>

        <p className="Table-header">All Customer Data</p>
        <Table data={this.state.Guests}/>
      
      </div>
    );
  }
}

export default App;
