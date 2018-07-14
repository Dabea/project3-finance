import React, { Component } from 'react'
import { debug } from 'util';
import {Row, Icon} from 'react-materialize'
import './transaction.css'
import TableInput from './tableInput/tableinput'

// class TransactionTable extends Component {
    // render(){
       

        // const sampleData = [
        //     { date: '7/1/2018', description: 'Rent', category: 'Housing', cost: 1200.00  ,isEditing:false },
        //     { date: '7/1/2018', description: 'McDonalds',category: 'Fast Food',cost: 12.39 ,isEditing:false },
        //     { date: '7/1/2018', description: 'Target',category: 'Cleaning Suppys',cost: 41.47 ,isEditing:false }
        // ];

        const data = (props) => {
            
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
                        {props.data.map(tranaction => (
                            <tr key={tranaction._id}  className={ tranaction.isEditing ? 'background-active' : 'test'} >
                                <td>  <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} /> {tranaction.transaction.transactionDate}</td>
                                <td>  {tranaction.product.productName} </td>
                                <td className="borders"> <input className="input-bottom" type="text" value={tranaction.category} /> {tranaction.product.productDepartment} </td>
                                <td> ${tranaction.transac} </td>
                            </tr>  
                        ))}
                        </tbody>   
                    </table> 
            </div>
            </div>
        // }
       
        )
    }
//     }
// }

export default data;