import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Form from './componets/forms/forms'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries ,VerticalGridLines ,HorizontalGridLines ,XAxis, YAxis } from 'react-vis';
import TransactionTable from './componets/transaction-table/transactiontb'
import axios from 'axios';
// import uploadFIle from '../../upload';


const API_URL = 'http://localhost:8080/api';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:[],
      // date: '',
      // description: '',
      // category: '',
      // cost: ''
    };
  }

  componentDidMount(){
    axios
      .get(API_URL)
      .then(response => {
          this.setState({
            data: response.data
          });
          console.log(response.data)

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
        <TransactionTable 
          data = {this.state.data}
        />
        {/* <Form  /> */}

      </div>
    );
  }


}

export default App;
