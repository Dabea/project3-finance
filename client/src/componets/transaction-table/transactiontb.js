import React, { Component } from 'react'
import { debug } from 'util';
import {Row, Icon} from 'react-materialize'

class TransactionTable extends Component {
    render(){
        const sampleData = [
            { date: '7/1/2018', description: 'Rent', category: 'Houseing', cost: 1200 },
            { date: '7/1/2018', description: 'McDonalds',category: 'Fast Food',cost: 12.39},
            { date: '7/1/2018', description: 'Target',category: 'Cleaning Suppys',cost: 41.47}
        ];

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
                        {sampleData.map( (tranaction) => 
                            <tr>
                                <td> {tranaction.date} </td>
                                <td>  {tranaction.description} </td>
                                <td className="borders">  {tranaction.category} </td>
                                <td>  {tranaction.cost} </td>
                            </tr>  
                        )}
                        </tbody>   
                    </table> 
            </div>
            </div>
       
        )
    }
}

export default TransactionTable;