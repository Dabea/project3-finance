import React, { Component } from 'react'
import './trends.css'

import axios from 'axios';
import moment from 'moment';



const API_URL = 'http://localhost:8080/api/trends';

class TrendsTable extends Component {
    
       

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




   
    // const data = (props) => {
       
    render(){
    return(
        <div className="row">
            <div className="col s8 offset-s2">

            

<ul class="pagination">
    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
    <li class="active"><a href="#!">Day</a></li>
    <li class="waves-effect"><a href="/trends/weekly">Week</a></li>
    <li class="waves-effect"><a href="/trends/monthly">Month</a></li>
    <li class="waves-effect"><a href="/trends/quarter">Quarter</a></li>
    <li class="waves-effect"><a href="/trends/weekly"><i class="material-icons">chevron_right</i></a></li>
  </ul>



                <table className="striped s6 offset-s6">
                    <thead>
                        <tr>
                            <th> Item  </th>
                            <th> Group  </th>
                            <th> Quantity  </th>
                            <th> Price  </th>
                            <th> Date  </th>
                        </tr>
                    </thead>
                    <tbody>
                     {this.state.data.map(tranaction => (
                        <tr key={tranaction._id}  className={ tranaction.isEditing ? 'background-active' : 'test'} >

                                {/* PRODUCT */}
                                    <td>  {tranaction.product.productName} </td>

                                {/* GRUOP */}
                                    <td className="borders">
                                            {/* <input className="input-bottom" type="text" value={tranaction.category} />  */}

                                    {tranaction.product.productDepartment} </td>

                                {/* PRICE */}
                                <td> {tranaction.transaction.transactionQuantity} </td>

                                {/* PRICE */}
                                    <td> ${tranaction.transaction.transactionTotal} </td>

                                {/* DATE */}
                                    <td> 
                                        {/* <TableInput name="test" value={tranaction.description} isEditing={tranaction.isEditing} />  */}
                                            
                                       {  moment( tranaction.transaction.transactionDate).format('L')   }</td>
                                        
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

export default TrendsTable;