import React from "react"
import '../style.css';




const transactionInfo = (props) => (

    <div>

        <form>
                <span className="model-header-title" > Info </span>

                <div className="input-field " >
                    <label htmlFor="date"  >Date </label><br />
                    <input onChange={props.onChange} value={props.date} name="date" type="date" />
                </div>

                <div className="input-field" >
                    <input className="validate" type="text" name="store" value={props.store} onChange={props.onChange} />
                    <label htmlFor="store"  >Store </label>
                </div>

                <div className="input-field" >
                    <input className="validate" type="text" name="total" value={props.total} onChange={props.onChange} />
                    <label htmlFor="total"  >Total </label>
                </div>
            

        </form>
                
    </div >
)

export default transactionInfo;