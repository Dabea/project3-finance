import React, { Component } from 'react'
import { debug } from 'util';
import './transaction.css'
import TableInput from './tableInput/tableinput'

import axios from 'axios';



const API_URL = 'http://localhost:8080/api';

class TransactionTable extends Component {

    // const sampleData = [
        //     { date: '7/1/2018', description: 'Rent', category: 'Housing', cost: 1200.00  ,isEditing:false },
        //     { date: '7/1/2018', description: 'McDonalds',category: 'Fast Food',cost: 12.39 ,isEditing:false },
        //     { date: '7/1/2018', description: 'Target',category: 'Cleaning Suppys',cost: 41.47 ,isEditing:false }
        // ];

       
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
       
    render(){
    return(
        <div className="row">
            <div className="col s8 offset-s2">
                <table className="striped s6 offset-s6">
                    <thead>
                        <tr>
                            <th> Date  </th>
                            <th> Description  </th>
                            <th> category  </th>
                            <th> Cost  </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(tranaction => (
                        <tr key={tranaction._id}  className={ tranaction.isEditing ? 'background-active' : 'test'} >
                            <td> 
                                 {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                 {tranaction.transaction.transactionDate}</td>
                            <td>  {tranaction.product.productName} </td>
                            <td className="borders"> 
                            
                            {/* <input className="input-bottom" type="text" value={tranaction.category} />  */}
                            
                            {tranaction.product.productDepartment} </td>
                            <td> ${tranaction.transaction.transactionTotal} </td>
                        </tr>  
                    ))}
                    </tbody>   
                </table> 
        </div>
        </div>    
    )
}
}

export default TransactionTable;