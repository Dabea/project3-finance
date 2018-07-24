        import React, { Component } from 'react'

import './trends.css'

import axios from 'axios';

import moment from 'moment';


const API_URL = 'http://localhost:3001/api/store';

class MonthlyTrendsTable extends Component {
    
       
        
  constructor(props) {
    super(props);
    
    this.state = {
      data:[],
     
    };
  };

  componentDidMount(){
        axios
            .get(API_URL)
            .then(response => {
                this.setState({
                data: response.data
                });
                console.log(response.data)

            })
            .catch((err)=> {
            console.log(err)
        })
    };

    // const data = (props) => {
       
    render(){
    return(
        <div className="row">
      
      <div className="row"> 

            <ul class="pagination">
                <li class="waves-effect"><a href="/trends/daily"><i class="material-icons">chevron_left</i></a></li>
                <li class="waves-effect"><a href="/trends/trends">Overview</a></li>
                <li class="waves-effec"><a href="/trends/daily">Date</a></li>
                <li class="active"><a href="#!">Store</a></li>
                <li class="waves-effect"><a href="/trends/quarter">Total</a></li>
                <li class="waves-effect"><a href="/trends/quarter"><i class="material-icons">chevron_right</i></a></li>
            </ul>

</div>

      <div className="col s8 offset-s2">

 <div className="row">  
        <h2> About  </h2>
         <h3> Transactions by Store </h3>
         
         </div>

               <table className="striped s6 offset-s6">
                    <thead>
                        <tr>
                            <th> Items  </th>
                            <th> Quantity  </th>
                            <th> Price  </th>
                            <th> Store  </th>
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
                                    {transaction.items.map(e =>  <table><thead><tr><th>${e.cost}</th></tr></thead></table>   )} 
                                          </td>

                                {/* STORE */}
                                    <td className="borders"> 
                                        {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                            
                                   
                                    {transaction.items.map(e =>  <table><thead><tr><th>  {transaction.store}</th></tr></thead></table>   )} 
                                       {/* {  moment( tranaction.transaction.transactionDate).format('L')   } */}
                                       
                                       </td>
                                        
                        </tr>  
                     ))}
                    </tbody>    
                </table> 
            </div>
        </div>
    // }
    
    )
}
}


//     }
// }

export default MonthlyTrendsTable;