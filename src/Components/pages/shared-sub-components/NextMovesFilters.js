import React from 'react'

const NextMovesFilters = (props) => {
    return (
        <form id="next-moves-filters" onSubmit={props.applyFilter}>
            <p style={{textDecoration: "underline"}} >Filters: </p>
            <div>
                <label htmlFor="level-filter">Level: </label>
                <br/>
                <select style={{textAlign: "center"}} id="level-filter" value={props.levelFilter} onChange={e => props.setLevelFilter(e.target.value)}>
                    <option value="">All Levels</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                </select>
            </div>
            <div>
                <label htmlFor="component-filter">Component: </label>
                <br/>
                <select style={{textAlign: "center"}} id="component-filter" value={props.componentFilter} onChange={e => props.setComponentFilter(e.target.value)}>
                    <option value="">All Components</option>
                    <option value="form specific stretches">Form Specific Stretches</option>
                    <option value="switches and transitions">Switches & Transitions</option>
                </select>
            </div>                                        
            <button type="submit" style={{padding: "3px 6px"}}>Apply</button>
        </form>
    )
}

export default NextMovesFilters