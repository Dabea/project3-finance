import React from "react"
import axios from 'axios'; 
import Form from "./Form"
import "./style.css"

const API_URL = 'http://localhost:3001/api';
class FormCarousel extends React.Component {



    state =  {
        // count: 0
        data: [],
        name: '',
        date: '',
        quantity: '1',
        cost: '',
        category: '',
        store: '',
        total: '',
        count:0, 
    }; 

    onChange = (e) =>  {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        this.setState({  name: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const newEntry = {
             name: this.state.name,
        };


        axios
            .post(API_URL , {newEntry})
            .then(response => {
                console.log(response);
                console.log(response.data)
                })
               

            .catch((err) => {
                console.log(err)
            })

    };

   

    increment = () => {
        this.setState({
            count: this.state.count + 1,
        });
     
    };



   render(){
    //    const { name, date, quantity, cost, category, store, total } = this.state;
        return (
        <div className="container">
                {/* <form onSubmit={this.onSubmit}>
                <input type="text" name="product" value={product} onChange={this.onChange} />                
                <input type="text" name="date" value={date} onChange={this.onChange} />
                <input type="text" name="quantity" value={quantity} onChange={this.onChange} />
                <input type="text" name="cost" value={cost} onChange={this.onChange} />                 
                <input type="text" name="department" value={department} onChange={this.onChange} />                 
                
                <div>{this.state.count}</div >
                </form> */}

                <div className="form-carousel">
                    <Form onSubmit={this.onSubmit} onChange={this.onChange} data={this.state.data[this.state.count]} increment={this.increment}/>
                </div>
            


                <div >
                    <button onClick={this.onSubmit } >Submit </button>
                </div >
        </div>

        
    ) 
  }
}


export default FormCarousel;