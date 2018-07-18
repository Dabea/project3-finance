import React, { Component } from 'react';
import '../forms/forms.css';
import axios from 'axios';


class Forms extends Component {

    state = {
        product: '',
        date: '',
        quanity: '1',
        cost: '',
        department: ''
    }

    addreceipt = () =>  {
       axios.post('/api/receipt', this.state)
            .then(
                console.log('the Receipt has been added')
            )
    
    }

    handelChangeEvent = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){

        return (
            <div className="backdrop1"  >
            
                <div className="form" >
                    <div className="model-header">
                      <span className="model-header-title" >Item Info </span>  
                    </div>
                    <div className="model-body"> 
                        <div className="input-field" >
                            <input className="input-field"  onChange={this.handelChangeEvent} value={this.state.product} name="product" type="text" />
                            <label  for="products"  >Product </label>
                        </div>
                        <div className="input-field " >
                            <label  className="input-area-label" >  </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.date} name="date" type="date" />
                        </div>
                        <div className="input-field" >
                            <label  className="input-area-label" > Quanity </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.quanity} name="quanity" type="text" />
                        </div> 
                        <div className="input-field" >
                            <label  className="input-area-label" > Cost </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.cost} name="cost" type="text" />
                        </div>
                        <div className="input-field" >
                            <label  className="input-area-label" > Department </label>
                            <input  onChange={this.handelChangeEvent} value={this.state.department} name="department" type="text" />
                        </div>
                            <button  onClick={this.addreceipt} >Submit </button>
                         </div>
                    </div>    
                  
                   
            </div>    
        )
    }
}

export default Forms;