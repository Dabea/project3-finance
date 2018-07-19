import React, { Component } from 'react';

class TableInput extends Component  {
    constructor(props){
        super(props);
    }

    state = {
        isEditing: this.props.isEditing,
        value: this.props.value

    }

    render () {
        let dispaly;

        if ( this.state.isEditing === true) {
            dispaly =  <input value={this.props.value} type="text" />;
        }
        
        else {
            dispaly =  <div> {this.props.value}</div>;
        }

        return(
            <div>
                {dispaly}
             </div>   
        )
    }
}

export default TableInput;