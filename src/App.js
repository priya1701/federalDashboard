import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TableWithFilterData from "./views/TableWithFilter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Federal</h1>
        </header>

        <p className="Table-header">All Customer Data</p>
       
        <TableWithFilterData/>
      
      </div>
    );
  }
}

export default App;
