import React, { Component } from 'react'
import {XYPlot, XAxis,Hint,AreaSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';
import moment from 'moment';


class Chart extends Component {

    state = {
        testValue: [],
        formatedData: [],
        data: [],
        propdata: [],
        costByItem: [],
        receiptsThisMonth: [],
        activePlot: {'x':0, 'y':0}
    }

  
    componentDidMount() {
      
        axios.get("http://localhost:3001/api")
            .then(response => {
                this.setState({
                data: response.data
                });

              
                this.formatForChart();
            })
            .catch((err)=> {
                console.log(err)
            })
       
    }

    getThisMonthsdata = () => {
        axios.get("http://localhost:3001/api/date")
        .then(response => {
             const test = response.data.reduce( (receipts, current ) => {
                 if( moment(current.date).isSame(new Date(), 'month')){
                     console.log("is in the same month")
                     return current
                  }
             })
             console.log("data responce", test);
            this.setState({
            receiptsThisMonth: response.data
            });

            console.log("state Data" ,this.state.receiptsThisMonth)
            this.formatForChart();
        })
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data!==this.props.data){

    //         console.log("nextProps" ,nextProps.data)
    //     this.setState({
    //         propdata: nextProps.data
    //     })
       
    //     } 
    // }

    formatForChart = () => {
        let formattedData = []
        let dataCopy = [...this.state.data];
        dataCopy.forEach(value =>{
            value.items.forEach(
                (item , index) => {
                    formattedData.push({label: item.name, x:parseFloat(index) , y: parseFloat(item.cost) } )
                })},
            this.setState({formatedData : formattedData}) );
    }

    monthy = () => {
        let myArray = [];
        let modifieddata = [];
        modifieddata =[...this.state.formatedData];
        console.log("Values Modified",modifieddata)
        modifieddata.reduce((acc, object, currentIndex) => {
             let key = object['x'];
             if (!acc[key]) {
                 acc[key] = [];
                 acc[key].push(object);
                 myArray.push(object)
               return acc;
               }else{
                   acc[key].forEach(accData => {
                     if(accData.x === object.x){ accData.y = (parseFloat(object.y) + parseFloat(accData.y)) }
                   }) 
                   acc[key].push(object);
                 return  acc;
               }   
         })
        this.setState({testValue: myArray})
     }

     updateState =() => {
        this.forceUpdate()
     }

     costyByItem = () => {
       let costByItem = [];
       const basedata = [...this.state.formatedData];
       basedata.forEach( item => {
           let hasItem = costByItem.filter(newItem => newItem.label === item.label ) 
            if(hasItem.length === 0){
                item.x=costByItem.length-1;
                costByItem.push(item);
                console.log("first time This Item apperas" , item.label)
            }else{
                console.log("allread in costByItem", costByItem)
                costByItem.forEach((foundItem , index) => {
                    console.log(foundItem.label, item.label )
                    if(foundItem.label === item.label ){
                        console.log("match")
                        console.log("Peiced togaether", costByItem[index].y,  item.y, costByItem[index].y )
                        costByItem[index].y = item.y + costByItem[index].y;
                        console.log("should be" , costByItem[index].y)
                      
                    }
                })
            }
       } )
        this.setState({costByItem: costByItem})

     }

     



    render() {
       


         
        return(  
            <div>
                 
               <button onClick={this.monthy} > Month </button>
               <button onClick={this.costyByItem} > Costy By Item </button>
               <button onClick={this.getThisMonthsdata} > get This Month </button>
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
                <VerticalBarSeries color={'url(#CoolGradient)'} data={this.state.testValue} />
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