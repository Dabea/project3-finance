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
    "transactionDate": "2018-05-02T06:00:00.000Z",
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
    "transactionDate": "2018-05-05T06:00:00.000Z",
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
    "transactionDate": "2018-05-06T06:00:00.000Z",
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
    "transactionDate": "2018-06-01T06:00:00.000Z",
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
    "transactionDate": "2018-06-06T06:00:00.000Z",
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
    "transactionDate": "2018-06-20T06:00:00.000Z",
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
    "transactionDate": "2018-06-15T06:00:00.000Z",
    "transactionQuantity": "1",
    "transactionTotal": "1.57"
    },
    "_id": "5b47ea50588d901d9d24193b",
    "__v": 0
    },
    {
        "product": {
        "productName": "FRZN ICE",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-06-02T06:00:00.000Z",
        "transactionQuantity": "1",
        "transactionTotal": "1.39"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        {
        "product": {
        "productName": "Coke 12 Pack",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-03T06:00:00.000Z",
        "transactionQuantity": "3",
        "transactionTotal": "12.39"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        {
        "product": {
        "productName": "Chicken Brest",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-03T06:00:00.000Z",
        "transactionQuantity": "2lb",
        "transactionTotal": "6.95"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        
        {
        "product": {
        "productName": "Ranch Dressing",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-03T06:00:00.000Z",
        "transactionQuantity": "6lb",
        "transactionTotal": "6.95"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        
        {
        "product": {
        "productName": "Chicken Brest",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-08T06:00:00.000Z",
        "transactionQuantity": "2lb",
        "transactionTotal": "6.95"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        {
                    "product": {
        "productName": "Bread",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-08T06:00:00.000Z",
        "transactionQuantity": "2lb",
        "transactionTotal": "2.29"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        {
        "product": {
        "productName": "eggs",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-08T06:00:00.000Z",
        "transactionQuantity": "2lb",
        "transactionTotal": "1.89"
        },
        "_id": "5b47ea50588d901d9d241935",
        "__v": 0
        },
        {
        "product": {
        "productName": "coke",
        "productStore": "",
        "productDepartment": "GROCERY"
        },
        "transaction": {
        "transactionDate": "2018-07-12T06:00:00.000Z",
        "transactionQuantity": "12 Pack",
        "transactionTotal": "4.89"
        },
        "_id": "5b47ea50588d901d9d241935",
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
        propdata: [],
        activePlot: {'x':0, 'y':0}
    }

  
    componentDidMount() {
      
        // axios.get('/api')
        //     .then(response => {
        //         this.setState({
        //         data: response.data
        //         });
        
        //     })
        //     .catch((err)=> {
        //         console.log(err)
        //     })
       
    }

    componentWillReceiveProps(){
        // console.log("all my data" ,this.state.data)
        // this.setState({
        //     propdata: this.props.data
        // })
        // console.log(this.props.data)
        
    }

    formatForChat = () => {
        if(testData.length === this.state.testValue.length){
            return;
        }
        testData.map(value =>
            this.state.testValue.push(
           { x: new Date(value.transaction.transactionDate).getTime() , y: value.transaction.transactionTotal }) 
           )
    }

    monthy = () => {
       let modifieddata = [...this.state.testValue];
        let reduceValue = modifieddata.reduce((acc, object) => {
            let key = object['x'];
            if (!acc[key]) {
                acc[key] = [];
                
              }
              acc[key].push(object);
              return acc;
        })

        console.log("mysterly return" , reduceValue)


    //    modifieddata = modifieddata.map( element =>   ( {'x':element.x ,'y':element.y * (Math.random() + .5) }))
       this.setState({testValue: modifieddata})

    }


    render() {
       
       this.formatForChat();
       
       
         
        return(  
            <div>
               <button onClick={this.monthy} > Update </button>
               {/* {this.state.testValue.map(data => <div> {data.x} | {data.y}</div>)} */}
               {/* {this.state.testValue.forEach(data => console.log(data) )} */}
               {/* {this.state.data.map(elem => <div>elem </div>)} */}
              <XYPlot xType="time-utc"  height={800} width={800}>
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
                <VerticalBarSeries onValueMouseOver={(datapoint, event)=>{
    console.log(datapoint)
    this.setState({activePlot :datapoint})
  }} color={'url(#CoolGradient)'} data={this.state.testValue} />
                <Hint  x={30} y={40} value={this.state.activePlot} />
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