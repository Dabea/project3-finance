import React, { Component } from 'react'
import {XYPlot, XAxis,Hint,AreaSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';
import moment from 'moment';
import './chart.css';


class Chart extends Component {

    state = {
        testValue: [],
        formatedData: [],
        data: [],
        propdata: [],
        costByItem: [],
        receiptsThisMonth: [],
        activePlot: {'x':0, 'y':0, 'Total': 0}
    }

  
    componentDidMount() {     
        axios.get("http://localhost:3001/api")
            .then(response => {
                this.setState({
                data: response.data
                });
                console.log("original Data", this.state.data)
                this.formatForChart();
                this.costyByItem();
            })
            .catch((err)=> {
                console.log(err)
            })
          

    }

    getThisdataByTime = (timeInterval) => {
        axios.get("http://localhost:3001/api/date")
        .then(response => {
            let receipts = [];
            response.data.forEach(receipt => {
                if(moment(receipt.date).isSame(new Date(), timeInterval)){
                    receipts.push(receipt)
                    console.log('found');
                }
            })
           this.setState({data: receipts})
           this.formatForChart()
           console.log("new data" ,this.state.formatedData);
        })
    }

    formatForChart = () => {
        let formattedData = []
        let dataCopy = [...this.state.data];
        dataCopy.forEach(value =>{
            value.items.forEach(
                (item , index) => {
                    formattedData.push({label: item.name, x:parseFloat(index) , y: parseFloat(item.cost) } )
                })},
            this.setState({formatedData : formattedData},   console.log("FORMATED" , formattedData)) ); 
    }
    
    setTotal= () =>{
        this.setState({
            activePlot: {'x':0, 'y':0, 'Total':  this.getToalMoneySpent() }
        })
    }
    


     updateState =() => {
        this.forceUpdate()
     }

     costyByItem = () => {
       let costByItem = [];
       const basedata = [...this.state.formatedData];
       var totalPriceMap = {};
       basedata.forEach(item => {
            if(totalPriceMap[item.label]) {
                totalPriceMap[item.label] += item.y;
            } else {
                totalPriceMap[item.label] = item.y;
            }
       });

       let i = 0;
       for(let item in totalPriceMap) {
           costByItem.push({label: item, x: i, y: totalPriceMap[item]})
           i++
       }
       
        this.setState({testValue: costByItem})
         this.setTotal();
     }

  

     testFormatedData = () => {
        return this.state.formatedData;
     }

     getToalMoneySpent= () => {
        let total = 0;
        const currentData = [...this.state.testValue];
        console.log(currentData);
        currentData.forEach((item) => total += item.y)
        console.log("total" ,total);
        return total
     }


     removeItem = (item) => {
        let copiedData = [...this.state.testValue]
        const index = this.state.testValue.map(item => item.label).indexOf(item);
        copiedData.splice(index, 1);
        this.setState({
            testValue: copiedData
        })
     }
     



    render() {
       


         
        return(  
            <div>
                <XYPlot  type="ordinal" height={800} width={800}>
              <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <HorizontalGridLines />
                <VerticalGridLines />
                <LabelSeries
                    animation
                    allowOffsetToBeReversed
                    data={this.state.testValue} />
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="blue" stopOpacity={0.4} />
                    </linearGradient>
                </GradientDefs>
                <VerticalBarSeries onValueMouseOver={(datapoint, event)=>{
                    datapoint.Total = this.getToalMoneySpent();
                    this.setState({activePlot :datapoint})
                }}  color={'url(#CoolGradient)'} data={this.state.testValue} />
                <Hint  x={30} y={40} value={this.state.activePlot} />
              </XYPlot>
              <div className="padding" >
                 {this.state.testValue.map(item => <div  key={item.label} className="pill" > {item.label} <span onClick={ () => this.removeItem(item.label)} className="delete">X </span> </div>) }
              </div>
                 
               <button onClick={this.monthy} > Month </button>
               <button onClick={this.costyByItem} > Costy By Item </button>
               <button onClick={() => this.getThisdataByTime('month')} > get This Month </button>
               <button onClick={() => this.getThisdataByTime('day')} > get This day </button>
               <button onClick={() => this.getThisdataByTime('week')} > get This Week </button>
              <XYPlot  type="ordinal" height={800} width={800}>
              <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <HorizontalGridLines />
                <VerticalGridLines />
                <LabelSeries
                    animation
                    allowOffsetToBeReversed
                    data={this.state.testValue} />
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="blue" stopOpacity={0.4} />
                    </linearGradient>
                </GradientDefs>
                <VerticalBarSeries onValueMouseOver={(datapoint, event)=>{
                    datapoint.Total = this.getToalMoneySpent();
                    this.setState({activePlot :datapoint})
                }}  color={'url(#CoolGradient)'} data={this.state.testValue} />
                <Hint  x={30} y={40} value={this.state.activePlot} />
              </XYPlot>
              <div className="padding" >
                 {this.state.testValue.map(item => <div  key={item.label} className="pill" > {item.label} <span onClick={ () => this.removeItem(item.label)} className="delete">X </span> </div>) }
              </div>
               

            </div>
        )
    }
}

export default Chart;