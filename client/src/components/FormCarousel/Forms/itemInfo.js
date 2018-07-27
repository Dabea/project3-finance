import React, {Component} from "react"
import '../style.css';



class itemInfo extends Component {

    state = {
        name: '',
        quantity: '1',
        cost: '',
        category: '',
    }

    handleNameChange = (e) => {
     this.setState({ name: e.target.value})
    }

    render(){
        return (<div>

           

                {/* FORM HEADER */}

                <div className="model-header">
                    <span className="model-header-title" >New Entry</span>
                </div>
                <br />

                {/* FORM ENTRY FOR ITEMS */}


                <span className="model-header-title" >Item Info </span>

                <div className="model-body">

                    <div className="input-field" >
                        <input className="validate" type="text" name="product" value={this.state.name} onChange={this.handleNameChange} />
                        <label htmlFor="products"  >Product Name </label>
                    </div>

                    <div className="input-field" >
                        <input className="validate" type="text" name="quantity" value={this.props.quantity} onChange={this.props.onChange} />
                        <label htmlFor="quantity"  >Quantity </label>
                    </div>

                    <div className="input-field" >
                        <input className="validate" type="text" name="cost" value={this.props.cost} onChange={this.props.onChange} />
                        <label htmlFor="cost"  >Cost </label>
                    </div>

                    <div className="input-field" >
                        <input className="validate" type="text" name="category" value={this.props.category} onChange={this.props.onChange} />
                        <label htmlFor="category"  >Category </label>
                    </div>
                </div>

                <button className="button" onClick={()=>this.props.saveItemInfo(this.state, this.props.index)}> save</button>

        </div>
     )
   }
} 

    
        
export default itemInfo;