import React, { Component } from 'react'
import {XYPlot, XAxis,Hint,AreaSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';

let testData = [
    {
    "product": {
    "productName": "FRZN ICE",
    "productStore": "",
    "productDepartment": "GROCERY"
    },
    "transaction": {
    "transactionDate": "2000-02-02T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.39"
    },
    "_id": "5b47ea50588d901d9d241935",
    "__v": 0
    },
    {
    "product": {
    "productName": "NO COMMODITY DESCRIPTION",
    "productStore": "",
    "productDepartment": "MISC. TRANS."
    },
    "transaction": {
    "transactionDate": "2000-01-05T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "0.82"
    },
    "_id": "5b47ea50588d901d9d241936",
    "__v": 0
    },
    {
    "product": {
    "productName": "COOKIES/CONES",
    "productStore": "",
    "productDepartment": "GROCERY"
    },
    "transaction": {
    "transactionDate": "2000-01-06T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.5"
    },
    "_id": "5b47ea50588d901d9d241939",
    "__v": 0
    },
    {
    "product": {
    "productName": "FRUIT - SHELF STABLE",
    "productStore": "",
    "productDepartment": "GROCERY"
    },
    "transaction": {
    "transactionDate": "2000-01-01T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.21"
    },
    "_id": "5b47ea50588d901d9d241938",
    "__v": 0
    },
    {
    "product": {
    "productName": "BREAD",
    "productStore": "",
    "productDepartment": "PASTRY"
    },
    "transaction": {
    "transactionDate": "2000-01-06T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "0.99"
    },
    "_id": "5b47ea50588d901d9d241937",
    "__v": 0
    },
    {
    "product": {
    "productName": "BREAKFAST SWEETS",
    "productStore": "",
    "productDepartment": "PASTRY"
    },
    "transaction": {
    "transactionDate": "2000-01-20T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.89"
    },
    "_id": "5b47ea50588d901d9d24193d",
    "__v": 0
    },
    {
    "product": {
    "productName": "COOKIES/CONES",
    "productStore": "",
    "productDepartment": "GROCERY"
    },
    "transaction": {
    "transactionDate": "2000-01-15T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.57"
    },
    "_id": "5b47ea50588d901d9d24193b",
    "__v": 0
    }
];


class Chart extends Component {
    constructor(props){
        super(props)
    }
    state = {
        testValue: [],
        formatedData: [],
        data: [],
        propdata: []
    }

  
    componentDidMount() {
        axios.get('/api')
            .then(response => {
                this.setState({
                data: response.data
                });
        
            })
            .catch((err)=> {
                console.log(err)
            })
       
    }

    componentWillReceiveProps(){
        console.log("all my data" ,this.state.data)
        this.setState({
            propdata: this.props.data
        })
        console.log(this.props.data)
        testData.map(value =>
             this.state.testValue.push(
            { x: new Date(value.transaction.transactionDate).getTime() /100000 , y: value.transaction.transactionTotal }) 
            )
    }

    render() {
         
        return(  
            <div>
               
               {this.state.testValue.map(data => <div> {data.x} | {data.y}</div>)}
               {this.state.testValue.forEach(data => console.log(data) )}
               {/* {this.state.data.map(elem => <div>elem </div>)} */}
              <XYPlot   height={400} width={400}>
              <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <HorizontalGridLines />
                <VerticalGridLines />
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
                    </linearGradient>
                </GradientDefs>
                <VerticalBarSeries  color={'url(#CoolGradient)'} data={this.state.testValue} />
              </XYPlot>


              <XYPlot  height={400} width={400}>
                <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <LineSeries color={'url(#CoolGradient)'}  data={this.state.testValue} />
              </XYPlot>

              <XYPlot  height={400} width={400}>
                <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <AreaSeries color={'url(#CoolGradient)'}  data={this.state.testValue} />
              </XYPlot>
                    
           


              <XYPlot   height={400} width={400}>
              <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <MarkSeries color={'url(#CoolGradient)'}  data={this.state.testValue} />
              </XYPlot>
            </div>
        )
    }
}

export default Chart;