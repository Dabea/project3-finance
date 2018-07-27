import React,  { Component }  from 'react';
import axios from 'axios';
import {XYPlot, XAxis,Hint,AreaSeries, makeWidthFlexible, RadialChart, ArcSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import cloneDeep from 'clone-deep';
import moment from 'moment';



class Historgram extends Component {

    state = {
        data: [],
        historgramCurrent: [],
        historgramPrevious: [],
        itemList:[]
    }
    

    componentDidMount() {
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });

            this.setDataGroups()
            

        })
        .catch((err)=> {console.log(err)})
    }

    getItemList = () => {
        let itemList = [];
        let data = cloneDeep(this.state.data);
        data.forEach(receipt => {
            receipt.forEach(item => 
                itemList.push({ x: receipt.date.getTime(), y: item.cost, label: item.name })
            )
        });

        this.setState({itemList: itemList})
    }

    reduceByMonth = () => {
        let costByMonth = [];
        const basedata = cloneDeep(this.state.itemList)
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
            costByMonth.push({x: item , x0:item - (86400000 * 15),   y: totalPriceMap[item]}, 'style':{'color': 'white'} )
            i++
        } 

        return costByMonth
    }

    setDataGroups =  () => {
        let lastYearItems = [];
        let thisYearItems = [];
        let itemList = this.reduceByMonth();
        const lastYear = moment().subtract( 1 , 'year');
        const thisYear = moment();
       
        itemList.forEach(item => {
             if(moment(item.date).isSame(thisYear, 'year')){
                thisYearItems.push(item)
            }else if(moment(item.date).isSame(lastYear, 'year')){
                lastYearItems.push(item)
            }
        })
        

        
    }

    render(){
        return(
            <div>
                Hello Historgram
            </div>
        )
    }
}

export default Historgram;