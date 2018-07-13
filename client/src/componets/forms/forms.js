import React, { Component } from 'react';
import '../forms/forms.css';
import axios from 'axios';
import { Button, Icon} from 'react-materialize'

class Forms extends Component {

    state = {
        product: '',
        date: '',
        quanity: '1',
        cost: '',
        department: ''
    }

    addRecept = () =>  {
       axios.post('/api/recept', this.state)
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
                    <div className="input-field" >
                        <label  className="input-area-label" >Product </label>
                        <input  onChange={this.handelChangeEvent} value={this.state.product} name="product" type="input" />
                    </div>
                    <div className="input-field card-panel teal lighten-2" >
                        <label  className="input-area-label" >Date</label>
                        <input  onChange={this.handelChangeEvent} value={this.state.date} name="date" type="date" />
                    </div>
                    <div className="input-field" >
                        <label  className="input-area-label" >Quanity</label>
                        <input  onChange={this.handelChangeEvent} value={this.state.quanity} name="quanity" type="input" />
                    </div> 
                    <div className="input-field" >
                        <label  className="input-area-label" >cost</label>
                        <input  onChange={this.handelChangeEvent} value={this.state.cost} name="cost" type="input" />
                    </div>
                    <div className="input-field" >
                        <label  className="input-area-label" >Department</label>
                        <input  onChange={this.handelChangeEvent} value={this.state.department} name="department" type="input" />
                    </div>
                          <Button waves='light'>
                            <Icon>thumb_up</Icon>
                         </Button>
               </div>
            </div>    
        )
    }
}

export default Forms;