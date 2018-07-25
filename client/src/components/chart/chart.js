import React, { Component } from 'react'
import {XYPlot, XAxis,Hint,AreaSeries, VerticalRectSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';
import moment from 'moment';
import './chart.css';
import cloneDeep from 'clone-deep';


class Chart extends Component {

    state = {
        testValue: [],
        formatedData: [],
        data: [],
        propdata: [],
        costByItem: [],
        receiptsThisMonth: [],
        activePlot: {'x':0, 'y':0, 'Total': 0},
        removedItems: []
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

    getThisdataByTime = (timeInterval ,callback) => {
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
        callback();
    }

    formatForChart = () => {
    
        let formattedData = []
        let dataCopy = cloneDeep(this.state.data)
        dataCopy[0].x = 'foorbar';
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
       const basedata = cloneDeep(this.state.formatedData);
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
           costByItem.push({label: item, x: i +1.5  ,x0: i + 1, y: totalPriceMap[item]})
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
        const currentData = cloneDeep(this.state.testValue);
        console.log(currentData);
        currentData.forEach((item) => total += item.y)
        console.log("total" ,total);
        return total
     }


     removeItem = (item) => {
        let copiedData = cloneDeep(this.state.testValue)
        let removedItemList = cloneDeep(this.state.removedItems)
        const index = this.state.testValue.map(item => item.label).indexOf(item);
        removedItemList.push(this.state.testValue[index]);
        copiedData.splice(index, 1);
        this.setState({
            removedItems: removedItemList,
            testValue: copiedData
        })
     }

     addItemBackToList = (item) => {
        let copiedData = cloneDeep(this.state.testValue)
        let removedItemList = cloneDeep(this.state.removedItems)
        const index = this.state.removedItems.map(item => item.label).indexOf(item);
        console.log("the index" , index)
        console.log("label",  )
        copiedData.push(removedItemList[index])
        removedItemList.splice(index, 1);
        this.setState({
            removedItems: removedItemList,
            testValue: copiedData
        })
     }


     noDataToDisplay = () => {
            if(this.state.testValue.length === 0){
                return <div> There is no infomation to display for this date range </div>
            }  
    }



    render() {
       


         
        return(  
            <div>
               
                 
               <button onClick={this.monthy} > Month </button>
               <button onClick={this.costyByItem} > Costy By Item </button>
               <button onClick={() => this.getThisdataByTime('month', this.costyByItem)} > get This Month </button>
               <button onClick={() => this.getThisdataByTime('day', this.costyByItem)} > get This day </button>
               <button onClick={() => this.getThisdataByTime('week', this.costyByItem)} > get This Week </button>
               {this.noDataToDisplay()}
              <XYPlot  type="ordinal" height={800} width={800}>
              <XAxis  tickLabelAngle={90}   tickTotal={this.state.testValue.length }    />
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
                <VerticalRectSeries onValueMouseOver={(datapoint, event)=>{
                    datapoint.Total = this.getToalMoneySpent();
                    this.setState({activePlot :datapoint})
                }}  color={'url(#CoolGradient)'} data={this.state.testValue} />
                <Hint  x={30} y={40} value={this.state.activePlot} />
              </XYPlot>
              <div className="padding" >
                 {this.state.testValue.map(item => <div  key={item.label} className="pill" > {item.label} <span onClick={ () => this.removeItem(item.label)} className="delete">X </span> </div>) }
              </div>
              <div>
              {this.state.removedItems.map(item => <div  key={item.label} className="pill" > {item.label} <span onClick={ () => this.addItemBackToList(item.label)} className="delete">+</span> </div>) }
              </div>    
               

            </div>
        )
    }
}

export default Chart;