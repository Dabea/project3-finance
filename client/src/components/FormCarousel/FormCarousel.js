import React from "react"
import axios from 'axios'; 
import Form from "./Form"
import "./style.css"

class FormCarousel extends React.Component {



    state =  {
        // count: 0
        data: [],
        name: '',
        date: '',
        quantity: '1',
        cost: '',
        category: '',
        count:0, 
    }; 

    onChange = (e) =>  {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { name, date, quantity, cost, category} = this.state;

        axios.post('/', { name, date, quantity, cost, category})
            .then((result) => {
                //access the results here....
                console.log(result)
            });
    }

    componentDidMount(){
    const API_URL = 'http://localhost:3001/api';
    axios
      .post(API_URL)
      .then(response => {
          this.setState({
            data: response.data
          });
          console.log(response.data)

      })
      .catch((err)=> {
        console.log(err)
      })
    }
  

    increment = () => {
        this.setState({
            count: this.state.count + 1,
        });
     
    };



   render(){
        const { name, date, quantity, cost, category } = this.state;
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
                    <Form onSubmit={this.onSubmit} onChange={this.onChange} data={this.state.data[this.state.count]} />
                </div>
                
                <button >Previous</button>
                <button >New</button>
                <button onClick={this.increment}>Next</button>
        </div>
    ) 
  }
}


export default FormCarousel;