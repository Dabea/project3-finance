import React from "react"
import axios from 'axios'; 
// import Form from "./Form"
import "./style.css"

import ItemInfo from "./Forms/itemInfo"
import TransactionInfo from "./Forms/transactionInfo"

const API_URL = 'http://localhost:3001/api';
class FormCarousel extends React.Component {

        // save data in state
    state =  {
            name:'', 
            date:'', 
            quantity:'1', 
            cost:'', 
            category:'', 
            store:'', 
            total:'', 
            count:0, 
            forms: [0],
            items: [],


        }; 


    addMore = () =>  {
        const forms = this.state.forms; 
        let formNum = forms.length + 1;
        forms.push(formNum)
        const itemInfo = {}
        const items = this.state.items;
        items.push(itemInfo)
        // update data in state
        // will automatically call render method after update 

        this.setState( {forms, itemInfo }); 
    }

    onChange = (e) =>  {
        // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
        this.setState({ name: e.target.value });
        this.setState({ quantity: e.target.value });
        this.setState({ cost: e.target.value });
        this.setState({ category: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const newEntry = {
            items: this.state.items,
            date: this.state.date,
            store: this.state.store,
            total: this.state.total,
        };


        axios
            .post(API_URL , {})
            .then(response => {
                console.log(response);
                console.log(response.data)
                })
               

            .catch((err) => {
                console.log(err)
            })

    };


    saveItemInfo = (info, index) => {
        console.log(info, index)
        const items = this.state.items
        items.push(info)
        this.setState({items})
    }

    render = () => {
        // get data from state, not from props
        const data = this.state.data;
        return (
        <div className="container">
                <div className="form-carousel">
                    {this.state.forms.map((newEntry, index) => (
                        <ItemInfo key={newEntry}  saveItemInfo={this.saveItemInfo} index={index}/>
                    ))}
                    <button className="button" onClick={this.addMore}>add more items</button>
                        <TransactionInfo />
                </div>
            
                <div >
                    <button className="button" onClick={this.onSubmit } >Submit </button>
                </div >
        </div>

        
    ) 
  }
}


export default FormCarousel;