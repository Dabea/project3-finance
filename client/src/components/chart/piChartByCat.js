import React, { Component } from 'react';
import { makeWidthFlexible, RadialChart} from 'react-vis';
import axios from 'axios';
import cloneDeep from 'clone-deep'

class PiChart extends Component {

    state = {
        data: [],
        formatedByCategory: [],
        piChartData: []
    }
    

    componentDidMount() {
        axios.get("http://localhost:3001/api")
        .then(response => {
            this.setState({
            data: response.data
            });
            console.log("original Data", this.state.data)
           
            this.convertToItemList();
            this.combindCategoryPrices();
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    convertToItemList = () => {
        let formattedDataSet = []
        let dataCopy = cloneDeep(this.state.data)
        dataCopy.forEach(receipt =>{
            receipt.items.forEach(
                (item , i) => {
                    formattedDataSet.push({ category:item.category , y: item.cost } )
                })})
        this.setState({formatedByCategory:formattedDataSet})
        console.log("formatted data" ,formattedDataSet)   
    }

    combindCategoryPrices = () => {
        let categoryTotals = [];
        let categoryPriceMap = {}
        let itemList = cloneDeep(this.state.formatedByCategory);
        itemList.forEach((item) => {
            if(categoryPriceMap[item.category]){
                categoryPriceMap[item.category] += parseFloat(item.y)
            }else{
                categoryPriceMap[item.category] = parseFloat(item.y)
            }
        })
        let TotalSpent = this.getTotalPriceFromList(itemList)
        

        for(let item in categoryPriceMap){
            const angle = ((categoryPriceMap[item]/ TotalSpent) * 100)
            categoryTotals.push({label:item, angle:parseFloat(angle), style:{stroke:'black', strokeWidth: '0'}})
        }
        this.setState({
             piChartData: categoryTotals
        })
    }

    

    getTotalPriceFromList = (itemList) => {
        let value = itemList.reduce((acc ,current) => {
            return (parseFloat(acc) + parseFloat(current.y))
        },0)

        return value.toFixed(2);
    }

    updateHoveredSection = (dataPoint, value) => {
        console.log('trigger', value, dataPoint)
        if(value === '0px'){
            console.log("mouse Out event" ,dataPoint )
        }
        const displayedData = cloneDeep(this.state.piChartData);
        displayedData.forEach((category) =>{
            if(category.label === dataPoint.label){
                category.style = {stroke:'black', strokeWidth: '10px'}
            }else{
                category.style = {stroke:'black', strokeWidth: '0px'}
            }
        }) 

        this.setState({piChartData:displayedData})
    }

    updateHoveredSection2 = () => {
        const displayedData = cloneDeep(this.state.piChartData);
        displayedData.forEach((category) =>{
           
                category.style = {stroke:'black', strokeWidth: '0px'}

        }) 

        this.setState({piChartData:displayedData})
    }

    render(){
        
 
     
        const FlexibleRadialChart = makeWidthFlexible(RadialChart);
        return(
            <div  >
             <FlexibleRadialChart height={600} 
                    
                onValueMouseOver  ={ (dataPoint , event) => this.updateHoveredSection(dataPoint, '5px') }
                onSeriesMouseOut ={ () => this.updateHoveredSection2() }
                data={this.state.piChartData}
                labelsRadiusMultiplier={.8}
                labelsStyle={{
                    fontSize: 22,
                    fill: 'white'
                }}
                showLabels
                />
            </div>    
        )
    }
}

export default PiChart; 