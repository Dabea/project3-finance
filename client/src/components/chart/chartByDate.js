import React, { Component } from 'react';
import  {XYPlot, XAxis,Hint,VerticalRectSeries ,DecorativeAxis, FlexibleHeightXYPlot,  FlexibleXYPlot,FlexibleWidthXYPlot,LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';
import xyPlot from 'react-vis/dist/plot/xy-plot';
import moment from 'moment';
import cloneDeep from 'clone-deep';
import './chart.css';



class ChartBydate extends Component {

    state = {
        data: [],
        sortedData:[],
        formatedData:[],
        activePlot: {'x':0, 'y':0, 'Total': 0},
        noData: ''
    }

    componentDidMount() {
       this.getReceipts()
    }

    getReceipts = () => {
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });
            this.formatForChart()
            this.reduceByMonth()
        }).catch((err)=> {console.log(err)})
    }

    udateMoneyValues = () =>{
        const dataCopy =  cloneDeep(this.state.test)
        dataCopy.forEach(item => {
            item.y += Math.random() * 30
        })

        this.setState({
            test: dataCopy
        })
        console.log('test', this.state.test)
        console.log('formated', this.state.formatedData)
    }


    reduceByMonth = () => {
        let costByDay = [];
        const basedata = cloneDeep(this.state.formatedData)
        var totalPriceMap = {};
        console.log(basedata)
        basedata.forEach(item => {
            const FirstDay = this.getFirstdayOfTheMonth(item.x)
             if(totalPriceMap[FirstDay]) {
                 totalPriceMap[FirstDay] += parseFloat(item.y);
             } else {
                 totalPriceMap[FirstDay] = parseFloat(item.y);
             }
        });
        let i = 0;
        for(let item in totalPriceMap) {
            costByDay.push({x: item , x0:item - (86400000 * 15),   y: totalPriceMap[item]}, 'style':{'color': 'white'} )
            i++
        } 

         this.setState({formatedData: costByDay, test: costByDay})
      }

      /**
       * Gets the Time stamp of the first day of the Month
       * 
       * @param date Date
       * @returns UTC-Time Stamp
       */
      getFirstdayOfTheMonth = (date) => {
        let dt = new Date(date);
        let month = dt.getMonth(),
            year = dt.getFullYear();

        return new Date(year, month, 1).getTime();
      }

    formatForChart = () => {
        console.log('call')
        let formattedDataSet = []
        let dataCopy = cloneDeep(this.state.data)
        dataCopy.forEach(receipt =>{
            receipt.items.forEach(
                (item , i) => {
                    const date = new Date(receipt.date).getTime();
                    formattedDataSet.push({label: item.name, x0:date , x:date - 86400000  , y: item.cost } )
                })})
         
        this.setState({formatedData : formattedDataSet})
    }

    buildHintDisplay = (datapoint) => {
        const displayInfo = {
            Month:moment(parseFloat(datapoint.x)).format('MMMM YYYY'),
            Total:'$' + parseFloat(datapoint.y).toFixed(2)
        }

        this.setState({activePlot :displayInfo})
    }


    
    thisYear = () => {
        this.getReceipts()
    }

    render() {
        const axisStyle = {
            line: {
                color:'green'
            },
            ticks: {
              fontSize: '64px',
              color: '#333'
            },
            title: {
                stoke:'green',
              fontSize: '33px',
              color: '#333'
            }
          };
       
        return(
            <div >
                <div className="btn-container">
                    <button className="btn"  onClick={this.thisYear} > test Button </button>
                    <button className="btn" onClick={this.udateMoneyValues} >Update Other set</button>
                </div>    
               
               <div className="waves-effect"><a href="/chart">Chart</a></div>
               <div >

                 <FlexibleWidthXYPlot height={600}  >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#0e6bf7" stopOpacity={0.7} />
                    </linearGradient>
                    </GradientDefs>
                    <XAxis style={axisStyle}  tickLabelAngle={90}  tickSizeOuter={6} style={{color: 'white'}} tickTotal={this.state.formatedData.length }  tickFormat={function tickFormat(d){return  moment(d).format('MMMM')}} />
                    <YAxis />
                    <VerticalRectSeries onValueClick={() => alert('clicked So good')}   onValueMouseOver={ datapoint => this.buildHintDisplay(datapoint) }
                        color={'url(#CoolGradient)'}   data={this.state.formatedData}  />
                    <Hint  x={30} y={40} value={this.state.activePlot} />
                </FlexibleWidthXYPlot>  
                </div>
            </div>    
        )
    }
}

export default ChartBydate;