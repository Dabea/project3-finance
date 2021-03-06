import React, { Component } from 'react';
import './forms.css';
import axios from 'axios';


const API_URL = 'http://localhost:3001/api';

class Forms extends Component {

    state = {
        item: [{
            name: '',
            quantity: '',
            cost: '',
            category: '',
        }],
        items: this.item,
        date: '',
        store: '',
        total: ''
    }

    addreceipt = () =>  {
       axios.post(API_URL, this.state)
            .then( response => {
                console.log(response)
                console.log('the Receipt has been added')
            })
        this.props.history.push("/transactions ")
    }

    handelChangeEvent = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){

        return (

<div className="container">
            
            <div className="backdrop1"  >
            
                <div className="form" >
                    <div className="model-header">
                      <span className="model-header-title" >New Entry </span>  
                    </div>
                    <div className="model-body"> 

{/* this is the information about the items from the transaction */}

                        <span className="model-header-title" >Item Info </span>  

                        <div className="input-field" >
                            <input className="input-field"  onChange={this.handelChangeEvent} value={this.state.item.name} name="name" type="text" />
                            <label  htmlFor="products"  >Product Name </label>
                        </div>
                        <div className="input-field" >
                            <label  className="input-area-label" > Quantity </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.item.quantity} name="quanity" type="text" />
                        </div> 


                        <div className="input-field" >
                            <label  className="input-area-label" > Cost </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.item.cost} name="cost" type="text" />
                        </div>
                        <div className="input-field" >
                            <label  className="input-area-label" > Category </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.item.category} name="category" type="text" />
                        </div>

                 

              {/* here goes an add button that replecates the item form to add multiple items */}
            
                        <div>
                        <button onClick={this.addreceipt} >Add more items </button>
                    </div>

         {/* this is the transaction information */}

                            <span className="model-header-title" >Transaction Info </span>  

                            <div className="input-field " >
                                <label className="input-area-label" >  </label>
                                <input onChange={this.handelChangeEvent} value={this.state.date} name="date" type="date" />
                            </div>

                        <div className="input-field" >
                            <label  className="input-area-label" > Store </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.store} name="store" type="text" />
                        </div>

                        <div className="input-field" >
                            <label  className="input-area-label" > Total </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.total} name="total" type="text" />
                        </div>
                            <button  onClick={this.addreceipt} >Submit </button>
                         </div>
                    </div>    
                  
                    
            </div>    

                </div>
        )
    }
}

export default Forms;