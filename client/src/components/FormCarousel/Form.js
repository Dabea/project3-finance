import React from "react"
import '../forms/forms.css';



const Form = (props) => (
    <div>
    
        <form onSubmit={props.onSubmit}>
            <input type="text" name="product" value={null} onChange={props.onChange} />
            <input type="text" name="date" value={props.date} onChange={props.onChange} />
            <input type="text" name="quantity" value={props.quantity} onChange={props.onChange} />
            <input type="text" name="cost" value={props.cost} onChange={props.onChange} />
            <input type="text" name="department" value={props.department} onChange={props.onChange} />

        </form>
    </div>
)

export default  Form;