import React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: 'rgba(0, 0, 0, 0.87)'
    },
});
  
const NextMovesFilters = (props) => {
    return (
        <>
            <p style={{textDecoration: "underline"}} >
                <HtmlTooltip placement='top' title={
                    <>
                        <strong>Static Activations</strong> cannot be filtered out as you can't have a flow without the base positions.
                        <br/>
                        <strong>Form Specific Stretches</strong> only appear in Level 1.
                        <br/>
                        <strong>Traveling Forms</strong> only start appearing in flows in Level 2.
                    </>
                }
                >
                    <i className="fas fa-info-circle"></i>
                </HtmlTooltip>
                Filters: 
            </p>
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
        </>
    )
}

export default NextMovesFilters