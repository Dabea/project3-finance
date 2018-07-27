import React, { Component } from "react";
import "./trends.css";
import axios from "axios";
import moment from "moment";

const API_URL = "http://localhost:3001/api/total";
class TotalTrendsTable extends Component {
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
        <div >



 <ul className="btn-container">
          <li className="btn ">
          <a href="/trends">Overview</a>
          </li>
          <li className="btn">
            <a href="/trends/date">Date</a>
          </li>
          <li className="btn">
            <a href="/trends/store">Store</a>
          </li>
           <li className="btn">
            <a href="#!">Total</a>
          </li>
        </ul> 
            

            <div className="col s8 offset-s2">

           
         
 <div className="row">  
        
         <h3> Transactions by Total Spent </h3>
         
         </div>

               <table className="s6 offset-s6">
                    <thead>
                        <tr>
                            <th> Items  </th>
                            <th> Quantity  </th>
                            <th> Price  </th>
                            <th> Total Spent </th>
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

                                {/* TOTAL */}
                                <td className="borders"> 
                                           
                                   ${transaction.total}
                                   </td>
                                        
                        </tr>  
                     ))}
                    </tbody>    
                </table> 
            </div>
        </div>
    
    
    )
}
}


export default TotalTrendsTable;
