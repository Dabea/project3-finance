import React, { Component } from 'react';
import  {XYPlot, XAxis,Hint,VerticalRectSeries , LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios'
import xyPlot from 'react-vis/dist/plot/xy-plot';
import moment from 'moment'



class ChartBydate extends Component {

    state = {
        data: [],
        sortedData:[],
        formatedData:[]
    }

    componentDidMount() {
        console.log("mount");
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });
            console.log("original Data", this.state.data)
            this.formatForChart()
           
           
        }).catch((err)=> {console.log(err)})

    }


    reduceByMonth = () => {
        let costByDay = [];
        const basedata = [...this.state.formatedData];
        var totalPriceMap = {};
        console.log(basedata)
        basedata.forEach(item => {
            const MonthName = moment(item.x).format('M')
            console.log(moment(item.x).format('M'))
             if(totalPriceMap[MonthName]) {
                 totalPriceMap[MonthName] += parseFloat(item.y);
             } else {
                 totalPriceMap[MonthName] = parseFloat(item.y);
             }
        });
       

        let i = 0;
        for(let item in totalPriceMap) {
 
            costByDay.push({x: parseFloat(item) , x0:parseFloat(item) -1,   y: totalPriceMap[item]})
            i++
        } 
        console.log("cost By date" ,costByDay)
         this.setState({formatedData: costByDay})
       
      }

    formatForChart = () => {
        console.log('call')
        let formattedDataSet = []
        let dataCopy = [...this.state.data];
        dataCopy.forEach(receipt =>{
            receipt.items.forEach(
                (item , i) => {
                    const date = new Date(receipt.date).getTime();
                    formattedDataSet.push({label: item.name, x0:date , x:date + 86400000  , y: item.cost } )
                })})
        this.setState({formatedData : formattedDataSet})
    }


    thisYear = () => {

    }

    render() {
       
       
        return(
         
            <div>
                <button onClick={this.reduceByMonth} > test Button </button>
                <XYPlot type="time-utc"   height={800} width={800} >
                    <VerticalRectSeries color={'url(#CoolGradient)'}  data={this.state.formatedData} />
                    <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="red" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="blue" stopOpacity={0.4} />
                    </linearGradient>
                    </GradientDefs>
                    <XAxis  tickLabelAngle={90}  tickSizeOuter={6} tickTotal={12}  tickFormat={function tickFormat(d){return  moment(d).format('MMMM')}} />
                    <YAxis />
                </XYPlot>   
            </div>    
        )
    }
}

export default ChartBydate;