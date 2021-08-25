import React from 'react'

const FormRandomFlow = (props) => {
    return (
        <form onSubmit={props.handleSubmit} style={{marginBottom: "16px"}} >
            <p className="form-title">Generate Random Flow</p>
            <div className="form-row">
                <div>
                    <label htmlFor="flow-length">Length: </label>
                    <input id="flow-length" type="number" required min="3" max="30" placeholder="min 3, max 30" value={props.flowLength} onChange={e => props.setFlowLength(parseInt(e.target.value))}></input>
                </div>
                <button type="submit" style={{padding: "3px 6px"}}>Submit</button>
            </div>
            <div className={`error ${!props.error ? "hidden" : ""}`}>{props.error}</div>
        </form> 
    )
}

export default FormRandomFlow