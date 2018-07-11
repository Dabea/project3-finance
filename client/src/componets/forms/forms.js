import React, { Component } from 'react';

class Forms extends Component {
    render(){
        return (
            <div>
                <div>
                    <label>Product </label>
                    <input name="product" type="input" />
                </div>
                <div>
                    <label>Date</label>
                    <input name="date" type="date" />
                </div>
                <div>
                    <label>Quanity</label>
                    <input name="quanity" type="input" />
                </div>
                <div>
                    <label>cost</label>
                    <input name="cost" type="input" />
                </div>
                <div>
                    <label>Department</label>
                    <input name="department" type="input" />
                </div>
               
            </div>    
        )
    }
}

export default Forms;