import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './componets/forms/forms'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries ,VerticalGridLines ,HorizontalGridLines ,XAxis, YAxis } from 'react-vis';
import TransactionTable from './componets/transaction-table/transactiontb'

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TransactionTable />
        {/* <Form  /> */}

      </div>
    );
  }
}

export default App;
