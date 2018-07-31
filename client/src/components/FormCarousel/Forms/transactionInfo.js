import React from "react"
import '../style.css';




const transactionInfo = (props) => (

    <div className="model-body">

        <div>
                <span className="model-header-title" >Transaction Info </span>
            
                <div className="input-field"> 
                    <input style={{ "background": "white" }} className="validate" onChange={props.onChange} value={props.date} name="date" type="date" />
                <label htmlFor="date"  >Date </label>
                </div>

                <div className="input-field" >
                    <input style={{ "background": "white" }} className="validate" type="text" name="store" value={props.store} onChange={props.onChange} />
                    <label htmlFor="store"  >Store </label>
                </div>

                <div className="input-field" >
                    <input style={{ "background": "white" }} className="validate" type="text" name="total" value={props.total} onChange={props.onChange} />
                    <label htmlFor="total"  >Total </label>
                </div>
            

        </div>
                
    </div >
)

export default transactionInfo;