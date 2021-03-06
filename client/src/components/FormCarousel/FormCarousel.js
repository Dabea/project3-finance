import React from "react"
import axios from 'axios'; 
import "./style.css"

import ItemInfo from "./Forms/itemInfo"
// import TransactionInfo from "./Forms/transactionInfo"


class FormCarousel extends React.Component {

        // save data in state

    
    constructor() {
        super();
        this.state =  {
            name:'', 
            date: Date.now(), 
            quantity:'', 
            cost:'', 
            category:'', 
            store:'', 
            total:'', 
            count:0, 
            forms: [0],
            items: [],
        }; 
    }
    


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
        this.setState({ [e.target.name]: e.target.value });
        // this.setState({ quantity: e.target.value });
        // this.setState({ cost: e.target.value });
        // this.setState({ category: e.target.value });
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

        console.log(newEntry)
        axios
            .post("/api" , 
                newEntry
            )
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

        return (
        // <div className="container">
        //         <div className="form-carousel">
        //             {this.state.forms.map((newEntry, index) => (
        //                 <ItemInfo key={newEntry}  saveItemInfo={this.saveItemInfo} index={index}/>
        //             ))}
        //             <button className="button" onClick={this.addMore}>add more items</button>
        //                 <TransactionInfo />
        //         </div>
            
        //         <div >
        //             <button className="button" onClick={this.onSubmit } >Submit </button>
        //         </div >
        // </div>

            <div className="valign-wrapper row login-box">
                <div className="grey col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form>
                        <div className="card-content">
                        <div className="form-carousel">
                            {this.state.forms.map((newEntry, index) => (
                                <ItemInfo key={newEntry} saveItemInfo={this.saveItemInfo} index={index} />
                            ))}
                                <button type="button" className="addmore-btn btn deep-purple lighten-1 waves-effect waves-light btn" onClick={this.addMore}>add more items</button>
                            
                            <div className="model-body">

                                <div>
                                        <span className="model-header-title" >Transaction Info </span>
                                    
                                        <div className="input-field"> 
                                            <input style={{ "background": "white" }} className="validate" onChange={this.onChange} value={this.state.date} name="date" type="date" />
                                        <label htmlFor="date"  >Date </label>
                                        </div>

                                        <div className="input-field" >
                                            <input style={{ "background": "white" }} className="validate" type="text" name="store" value={this.state.store} onChange={this.onChange} />
                                            <label htmlFor="store"  >Store </label>
                                        </div>

                                        <div className="input-field" >
                                            <input style={{ "background": "white" }} className="validate" type="text" name="total" value={this.state.total} onChange={this.onChange} />
                                            <label htmlFor="total"  >Total </label>
                                        </div>
                                    

                                </div>
                                    
                            </div >


                        </div>

                        <div >
                            <button  type="button" className="btn deep-purple lighten-1
                             waves-effect waves-light btn" onClick={this.onSubmit} >Submit </button>
                        </div >
                        </div>
                    </form>
                </div>
            </div>

        
    ) 
  }
}


export default FormCarousel;