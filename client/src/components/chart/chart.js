import React, { Component } from 'react'
import { XAxis,Hint,FlexibleWidthXYPlot,VerticalBarSeries, VerticalRectSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient} from 'react-vis';
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

    getThisdataByTime = (timeInterval) => {
        axios.get("http://localhost:3001/api/date")
        .then(response => {
            let receipts = [];
            response.data.forEach(receipt => {
                if(timeInterval === 'all' ){
                    receipts.push(receipt)
                }
                else if(moment(receipt.date).isSame(new Date(), timeInterval)){
                    receipts.push(receipt)
                    console.log('found');
                }
            })
           this.setState({data: receipts})
           this.formatForChart()
           
           this.costyByItem()
           
        })
        
    }

    formatForChart = () => {
         let formattedData = []
        let dataCopy = cloneDeep(this.state.data)
        if(this.state.data.length === 0 ){
            this.noDataToDisplay();
            this.setState({formatedData : formattedData},   console.log("FORMATED" , formattedData)); 
            return
        }
        
        dataCopy.forEach(value =>{
            value.items.forEach(
                (item , index) => {
                    formattedData.push({label: item.name, x:parseFloat(index) , y: parseFloat(item.cost), labelAnchorX:"start" } )
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
           costByItem.push({label: item, size:30,  style: {fontSize: 14,  fill:'white' }, rotation: -65, x: i +1.5  ,x0: i + 1, y: totalPriceMap[item]})
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
                return <div className="no-data" > There is no infomation to display for this date range </div>
            }  
    }



    render() {
       console.log("Test values" ,this.state.testValue)


         
        return(  
            <div>
               
                <div className="btn-container" >
                    <button className="btn" onClick={() => this.getThisdataByTime('all') } > All </button>
                    <button className="btn" onClick={() => this.getThisdataByTime('year') } > Year </button>
                    <button className="btn" onClick={() => this.getThisdataByTime('month')} > Month </button>
                    <button className="btn" onClick={() => this.getThisdataByTime('week')} > Week </button>
                    <button className="btn" onClick={() => this.getThisdataByTime('day')} > day </button>
                   
                </div>     
                {this.noDataToDisplay()}
              
              <FlexibleWidthXYPlot height={600}   >
              
              <XAxis  tickLabelAngle={90}   tickTotal={this.state.testValue.length }    />
                <YAxis title="Y Axis" />
                <HorizontalGridLines />
                <VerticalGridLines />
              
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#0e6bf7" stopOpacity={0.7} />
                    </linearGradient>
                </GradientDefs>
                <VerticalBarSeries onValueMouseOver={(datapoint, event)=>{
                    console.log(datapoint)
                    const test = {Item:datapoint.label, Total:this.getToalMoneySpent()}
                    // datapoint.Total = this.getToalMoneySpent();
                    this.setState({activePlot :test})
                    
                }}  color={'url(#CoolGradient)'} data={this.state.testValue} />
                  <LabelSeries
                   
                   animation
                   
                   data={this.state.testValue} />
                <Hint  x={30} y={40} value={this.state.activePlot} />
                
              </FlexibleWidthXYPlot >
              <div className="padding" >
                 {this.state.testValue.map(item => <div  key={item.label} className="pill"  onClick={ () => this.removeItem(item.label)}> {item.label}</div>) }
              </div>
              <div className="padding">
              {this.state.removedItems.map(item => <div  key={item.label} className="pill" onClick={ () => this.addItemBackToList(item.label)} > {item.label}  </div>) }
              </div>    
               

            </div>
        )
    }
}

export default Chart;