import React, { Component } from 'react'
import {XYPlot, XAxis,Hint,AreaSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';


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
      
        axios.get("http://localhost:3001/api")
            .then(response => {
                this.setState({
                data: response.data
                });

                console.log("state Data" ,this.state.data)
                this.formatForChat();
            })
            .catch((err)=> {
                console.log(err)
            })
       
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data!==this.props.data){

            console.log("nextProps" ,nextProps.data)
            this.formatForChat();
 
        this.setState({
            propdata: nextProps.data
        })
       
        } 
    }

    formatForChat = () => {
        let dataCopy = [...this.state.data];
        dataCopy.map(value =>{
            console.log(value.date)
            value.items.forEach(
                item => {
                this.state.testValue.push({item:item.name, x:new Date(value.date).getTime() , y: item.cost } )
                })} );
    }

    monthy = () => {
        let modifieddata = [...this.state.testValue];
         let reduceValue = modifieddata.reduce((acc, object, currentIndex) => {
             let key = object['x'];
             if (!acc[key]) {
                 acc[key] = [];
                 acc[key].push(object);
               return acc;
               }else{
                   acc[key].forEach(accData => {
                     if(accData.x === object.x){ accData.y = parseFloat(object.y) + parseFloat(accData.y) }
                   }) 
                 return  acc;
               }   
         })
     //    modifieddata = modifieddata.map( element =>   ( {'x':element.x ,'y':element.y * (Math.random() + .5) }))
        this.setState({formatedData: reduceValue})
 
     }


    render() {
       

       this.formatForChat();
       console.log("test Valuies" ,this.state.testValue);
         
        return(  
            <div>
                  {this.state.testValue}
               <button onClick={this.monthy} > Update </button>
              <XYPlot  type="linear" height={800} width={800}>
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
                <VerticalBarSeries  onValueMouseOver={(datapoint, event)=>{
                    this.setState({activePlot :datapoint})
                }} color={'url(#CoolGradient)'} data={this.state.formatedData} />
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