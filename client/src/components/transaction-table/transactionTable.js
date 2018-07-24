import React, { Component } from 'react'
import './transaction.css'
import axios from 'axios';

import moment from 'moment';

const API_URL = 'http://localhost:3001/api/transactions';

class TransactionTable extends Component {


       
  constructor(props) {
    super(props);
    
    this.state = {
      data:[],
     
    };
  };

  componentWillMount(){
        axios
            .get(API_URL)
            .then(response => {
                
                let transactions = response.data
                let item = response.data.map( e =>  e.items.name  ) ;
                let date = response.data.map( e =>  e.date  ) ;
                let store = response.data.map( e =>  e.store  ) ;
                let total = response.data.map( e =>  e.total  ) ;

                this.setState({
                    transactions: transactions ,
                    item : item,
                    date: date ,
                    store: store ,
                    total: total 
                    });
                    console.log("transactions", this.state.transactions)
                    console.log(this.state.item)
                    console.log( "date", this.state.date)
                    console.log(this.state.store)
                    console.log(this.state.total)
                    




                this.setState({
                data: response.data
                
                });
                console.log(response.data)
                

            })
            .catch((err)=> {
            console.log(err)
        })
    };
       
    render(){
    return(


        <div className="row">


            <div className="col s8 offset-s2">

      <div className="row">  
        <h2> About  </h2>
         <h3> Recent transactions </h3>
         
         </div>

                <table className="striped s6 offset-s6">
                    <thead>
                        
                        <tr>
                            
                            <th> Items </th>
                            <th> Group   </th>
                            <th> Price  </th>
                            <th> Date  </th>
                            <th> Store  </th>
                            <th> Total  </th> 
                        </tr>
                    </thead>
                    <tbody>
                     {this.state.data.map(transaction => (
                        <tr key={transaction._id} className={ transaction.isEditing ? 'background-active' : 'test'} >

                                {/* Item */}
                                <td className="borders">
                                            {/* <input className="input-bottom" type="text" value={tranaction.category} />  */}

                                    {transaction.items.map(e => <div> {e.name} </div>  )} 
                                    
                                    </td>
                                    
         {/* <table> <thead> <tr> <th>{e.name}</th> </tr> </thead> </table>      */}
        

  
                  


                               {/* PPRICE */}
                                   <td className="borders">
                                   
                                   {transaction.items.map(e => <div> ${e.cost} </div>)}

                                   </td>
    {/* QUANTITY */}
                            

                                <td className="borders"> 
                                
                                {transaction.items.map(e => <div> {e.category} </div>)}
                                 </td>

                               {/* DATE */}
                                   <td className="borders"> 
                                       {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                           
                                   { moment( transaction.date).format('L')  }
                                   </td>
                               {/* STORE */}
                                   <td className="borders"> 
                                       {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                           
                                   {transaction.store}
                                   </td>

                               {/* TOTAL */}
                                   <td className="borders"> 
                                       {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                           
                                   ${transaction.total}
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

export default TransactionTable;