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
                this.costyByItem();
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
     }

     testFormatedData = () => {
        return this.state.formatedData;
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