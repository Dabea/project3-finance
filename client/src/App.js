import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from './componets/forms/forms'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries ,VerticalGridLines ,HorizontalGridLines ,XAxis, YAxis } from 'react-vis';
import TransactionTable from './componets/transaction-table/transactiontb'
import axios from 'axios';


const API_URL = 'http://localhost:8080/api';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      date: '',
      description: '',
      category: '',
      cost: ''
    };
  }

  componentDidMount(){
    axios
      .get(API_URL)
      .then(response => {
          this.setState({
            date: transaction.transactionDate,
            description: product.productName,
            category: product.productDepartment,
            cost: transaction.transactionTotal
          });

      })
      .catch((err)=> {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <TransactionTable />
        {/* <Form  /> */}

      </div>
    );
  }
}

export default App;
