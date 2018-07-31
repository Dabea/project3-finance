import React, {Component} from "react"


class itemInfo extends Component {

    constructor() {
        super();
    this.state = {
        name: '',
        quantity: '1',
        cost: '',
        category: '',
    }
    }

    handleNameChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    render(){

        const { name, quantity, cost, category } = this.state;
        return (<div>

           

                {/* FORM HEADER */}

                <div className="new-entry">
                    <span className="model-header-title" >New Entry</span>
                </div>
                <br />

                {/* FORM ENTRY FOR ITEMS */}


                <span className="model-header-title" >Item Info </span>

                <div className="model-body">

                    <div className="input-field" >
                        <input style={{"background": "white"}} className="validate" type="text" name="name" value={name} onChange={this.handleNameChange} />
                        <label htmlFor="products"  >Product Name </label>
                    </div>

                    <div className="input-field" >
                    <input style={{ "background": "white" }} className="validate" type="text" name="quantity" value={quantity} onChange={this.handleNameChange} />
                        <label htmlFor="quantity"  >Quantity </label>
                    </div>

                    <div className="input-field" >
                    <input style={{ "background": "white" }} className="validate" type="text" name="cost" value={cost} onChange={this.handleNameChange} />
                        <label htmlFor="cost"  >Cost </label>
                    </div>

                    <div className="input-field" >
                    <input style={{ "background": "white" }} className="validate" type="text" name="category" value={category} onChange={this.handleNameChange} />
                        <label htmlFor="category"  >Category </label>
                    </div>
                </div>

            <div> Please save item info before submitting </div>

            <button type="button" className="save-btn btn deep-purple lighten-1 waves-effect waves-light btn" onClick={()=>this.props.saveItemInfo(this.state, this.props.index)}> save</button>

        </div>
     )
   }
} 

    
        
export default itemInfo;