import React,  { Component }  from 'react';
import axios from 'axios';
import {FlexibleWidthXYPlot,   VerticalRectSeries, VerticalBarSeries, XAxis,Hint,AreaSeries, makeWidthFlexible, RadialChart, ArcSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, MarkSeries} from 'react-vis';
import cloneDeep from 'clone-deep';
import moment from 'moment';



class Historgram extends Component {

    state = {
        data: [],
        historgramCurrent: [],
        historgramPrevious: [],
        itemList:[],
        activePlot: {'x':0, 'y':0, 'Total': 0}
    }
    

    componentDidMount() {
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });

            this.getItemList()
            this.setDataGroups()
            

        })
        .catch((err)=> {console.log(err)})
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

    getItemList = () => {
        let itemList = [];
        let data = cloneDeep(this.state.data);
        console.log(data)
        data.forEach(receipt => {
            receipt.items.forEach(item => 
                itemList.push({ x: receipt.date, y: item.cost, label: item.name })
            )
        });

        this.setState({itemList: itemList})
    }

    reduceByMonth = () => {
        let costByMonth = [];
        const basedata = cloneDeep(this.state.itemList)
        var totalPriceMap = {};
        console.log("base", basedata)
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
            costByMonth.push({ label:moment(parseInt(item)).format('YYYY'), x: parseInt(item) ,  y: totalPriceMap[item], style:{fill:'white'}}  )
            i++
        } 
        console.log("cost", costByMonth)
        return costByMonth
    }

    setDataGroups =  () => {
        let lastYearItems = [];
        let thisYearItems = [];
        let itemList = this.reduceByMonth();
        const lastYear = moment().subtract( 1 , 'year');
        const thisYear = moment();
       
        itemList.forEach(item => {

             if(moment(item.x).isSame(thisYear, 'year')){
                item.x= parseInt(moment(item.x).format('MM'));
                item.x0= parseInt(moment(item.x0).format('MM'))-.5;
                thisYearItems.push(item)
            }else if(moment(item.x).isSame(lastYear, 'year')){
                item.x= parseInt(moment(item.x).format('MM'));
                item.x0= parseInt(moment(item.x0).format('MM'))-.5 ;
                lastYearItems.push(item)
            }
        })      

        this.setState({ historgramPrevious: lastYearItems, historgramCurrent:thisYearItems })
    }

    onHover = (datapoint) => {
        let displayInfo = {};
        console.log(datapoint)
        displayInfo.TotalSpent = datapoint.y.toFixed(2)

        this.setState({ activePlot: displayInfo })
    }


    render(){
        const axisStyle = {
            line: {
                stroke: '#555555'
            },
            ticks: {
              fontSize: '1.2em',
              fill: 'white'
            },
            title: {
                stoke:'green',
              fontSize: '33px',
              
            }
          };



        return(
            <div>
               <FlexibleWidthXYPlot   xType="ordinal" height={600}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <GradientDefs>
                        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="red" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#0e6bf7" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="PastGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7E57c2" stopOpacity={0.6}/>
                            <stop offset="30%" stopColor="#7E57c2" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#0e6bf7" stopOpacity={0.5} />
                        </linearGradient>
                    </GradientDefs>
                    <YAxis title="Y Axis" />
                    <VerticalBarSeries onValueMouseOver={ (datapoint) => this.onHover(datapoint) }  color={'url(#PastGradient)'}   data={this.state.historgramCurrent}/>
                    <VerticalBarSeries onValueMouseOver={ (datapoint) => this.onHover(datapoint) }   color={'url(#CoolGradient)'}  data={this.state.historgramPrevious}/>
                    <LabelSeries
                         animation
                         allowOffsetToBeReversed
                         data={this.state.historgramPrevious} />
                           <LabelSeries
                         animation
                         allowOffsetToBeReversed
                         data={this.state.historgramCurrent} />
                    <XAxis style={axisStyle}  tickLabelAngle={90}  tickSizeOuter={6}    tickFormat={function tickFormat(d){return  moment(d).format('MMMM')}} />
                    <Hint  x={40} y={40} value={this.state.activePlot} />
               </FlexibleWidthXYPlot>    
            </div>
        )
    }
}

export default Historgram;