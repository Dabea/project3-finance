import React, { Component } from 'react';
import {XYPlot, XAxis,Hint,AreaSeries, ArcSeries, LabelSeries,  YAxis,VerticalGridLines, HorizontalGridLines, GradientDefs, linearGradient , LineSeries, VerticalBarSeries, MarkSeries} from 'react-vis';
import axios from 'axios';

class PiChart extends Component {

    state = {
        data: []
    }
    

    componentDidMount() {
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });
            console.log("original Data", this.state.data)
            this.formatForChart();
            this.costyByCategory();
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    formatForPiChart = () => {

    }

    render(){
        const PI = Math.PI;
        const myData = [
            {angle0: 0, angle: PI / 4, opacity: 0.2, radius:3 , radius0: 5, color:'red' },
            {angle0: PI / 4, angle: 2 * PI / 4, radius: 3, radius0: 1, color:'blue'},
            {angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 2, radius0: 1, color:'green'},
            {angle0: 3 * PI / 4, angle: 4 * PI / 4, radius: 2, radius0: 1 , color:'#999999'},
            {angle0: 4 * PI / 4, angle: 5 * PI / 4, radius: 2, radius0: 1},
            {angle0: 0, angle: 5 * PI / 4, radius: 1.1, radius0: 0.8}
          ];

        return(
            <div  >
               <XYPlot
                    xDomain={[-10, 10]}
                    yDomain={[-10, 10]}
                    width={800}
                    height={800}>
                    <ArcSeries
                        animation
                      
                        center={{x: -2, y: 2}}
                        data={myData} 
                        colorType={'literal'}/>
            </XYPlot>
            </div>    
        )
    }
}

export default PiChart; 