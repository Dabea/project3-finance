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
import Chart from './componets/chart/chart'


const API_URL = 'http://localhost:8080/api';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:[]
      // date: '',
      // description: '',
      // category: '',
      // cost: ''
    };
  }

  componentDidMount(){
    // axios
    //   .get(API_URL)
    //   .then(response => {
    //       this.setState({
    //         data: response.data
    //       });
          
    //       console.log(this.state.data);
    //   })
    //   .catch((err)=> {
    //     console.log(err)
    //   })
  }
  render() {
    return (
      
      <div className="App">
    
        <Chart data ={this.state.data} > </Chart>
        {/* <TransactionTable 
          data = {this.state.data}
        /> */}

      </div>
    );
  }


}

export default App;
