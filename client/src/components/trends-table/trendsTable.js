import React, { Component } from 'react'
import './trends.css'

import axios from 'axios';
import moment from 'moment';



const API_URL = 'http://localhost:3001/api/trends';

class TrendsTable extends Component {
    
        
  constructor(props) {
    super(props);
    
    this.state = {
      data:[],
     
      items: [],
    
    };
  };

 componentWillMount(){
        axios
            .get(API_URL)
            .then(response => {


                
                // let transactions = response.data.map( transaction => {
                //     let total = 0;
                //       transaction.items.forEach(item => { total = total + item.cost
                          
                //       });
                      
                 
                //      )} ;


                let transactions = response.data ;
                let items = response.data.map( t =>  t.items  ) ;
                let item = response.data.map( e =>  e.items.map( item =>  item.name  )   ) ;
                // let itemName = response.data.map( e =>  e.items.map( item =>  item.name.forEach( item => console.log(item)  )   )   ) ;
                let date = response.data.map( t =>  t.date  ) ;
                let store = response.data.map( t =>  t.store  ) ;
                let total = response.data.map( t =>  t.total  ) ;

                this.setState({
                    transactions: transactions ,
                    items: items ,
                    item: item ,
                    // itemName: itemName ,
                    date: date ,
                    store: store ,
                    total: total 
                    });
                    console.log("data", this.state.transactions)
                    console.log("items", this.state.items)
                    console.log("items names", this.state.item)
                    // console.log("ni idea", this.state.itemName)
                    console.log("dates", this.state.date)
                    console.log("stores" , this.state.store)
                    console.log("totals", this.state.total)
                    

             


                this.setState({
                data: response.data
                
                });
                console.log(response.data)
                

            })
            .catch((err)=> {
            console.log(err)
        })
    };




    formatForChat = () => {
        let dataCopy = [...this.state.data];
        dataCopy.map(value =>{
            console.log(value.date)
            value.items.forEach(
                item => {
                this.state.testValue.push({item:item.name, x:new Date(value.date).getTime() , y: item.cost } )
                })} );
    }
   
    // const data = (props) => {
       
    render(){
    return(

        
        <div >
        
<div className="row">
        <ul className="pagination">

    <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
    <li className="active"><a href="#!">Overview</a></li>
    <li className="waves-effect"><a href="/trends/daily">Date</a></li>
    <li className="waves-effect"><a href="/trends/monthly">Store</a></li>
    <li className="waves-effect"><a href="/trends/quarter">Total</a></li>
    <li className="waves-effect"><a href="/trends/daily"><i className="material-icons">chevron_right</i></a></li>

  </ul>

  </div>

<div className="row">

            <div className="col s8 offset-s2">

 <div className="row">  
        <h2> About  </h2>
         <h3> Transactions by product quantity </h3>
         
         </div>
                <table className="striped s6 offset-s6">
                    <thead>
                        <tr>
                            <th> Items  </th>
                            <th> Quantity  </th>
                            <th> Price  </th>
                            <th> Date  </th>
                        </tr>
                    </thead>
                    <tbody>
                     {this.state.data.map(transaction => (
                        <tr key={transaction._id}  className={ transaction.isEditing ? 'background-active' : 'test'} >

                                {/* PRODUCT */}
                           <td>

                                      {transaction.items.map(e =>  <table><thead><tr><th>{e.name}</th></tr></thead></table>   )} 
                                    

                                </td>

                            

                                {/* QUANTITY */}
                                <td className="borders">
                                {transaction.items.map(e =>  <table><thead><tr><th>{e.quantity}</th></tr></thead></table>   )} 
                                      </td>

                                {/* PRICE */}
                                    <td className="borders">
                                    {transaction.items.map(e =>  <table><thead><tr><th>{e.cost}</th></tr></thead></table>   )} 
                                          </td>

                                {/* DATE */}
                                    <td className="borders"> 
                                        {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                            
                                   
                                    {transaction.items.map(e =>  <table><thead><tr><th>{ moment( transaction.date).format('L')  }</th></tr></thead></table>   )} 
                                       {/* {  moment( tranaction.transaction.transactionDate).format('L')   } */}
                                       
                                       </td>
                                        
                        </tr>  
                     ))}
                    </tbody>    
                </table> 
            </div>
        </div>
        </div>
    // }
    
    )
}
}


//     }
// }

export default TrendsTable;