import React, { useRef, useEffect } from 'react'
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
    const levelOptions = useRef()
    const levelArrow = useRef()

    function toggleLevelMenu(){
        levelOptions.current.classList.toggle("hidden")
        levelArrow.current.classList.toggle("rotate180")
    }

    const lvAll = useRef()
    const lv1 = useRef()
    const lv2 = useRef()
    const lv3 = useRef()

    function manageLevelFilter(e){
        const selection = e.target.value

        const clearLevels = () => {
            lv1.current.checked = false
            lv2.current.checked = false
            lv3.current.checked = false
        }

        if (selection === "all") {
            clearLevels()
            props.setLevelFilter([])
            return
        }

        const newLevelFilter = [...props.levelFilter]

        if (e.target.checked) {
            // if all three levels are selected then empty the array
            if (newLevelFilter.length === 2) {
                newLevelFilter.length = 0
                lvAll.current.checked = true
                clearLevels()
            } else {
                newLevelFilter.push(selection)
                lvAll.current.checked = false
            }
        } else {
            const index = newLevelFilter.indexOf(selection)
            if (index > -1) newLevelFilter.splice(index, 1)
        }

        props.setLevelFilter(newLevelFilter)
    }

    return (
        <>
            <p style={{textDecoration: "underline"}} >
                <HtmlTooltip placement='top' title={
                    <>
                        <strong>Static Activations</strong> cannot be filtered out as you can't have a flow without the base positions.
                        <br/>
                        <strong>Form Specific Stretches</strong> only appear in Level 1.
                    </>
                }
                >
                    <i className="fas fa-info-circle"></i>
                </HtmlTooltip>
                Filters: 
            </p>
            <div className="filter-menu">
                <button type="button" onClick={toggleLevelMenu}>Level <i className="fas fa-chevron-down" ref={levelArrow}></i></button>
                <div className="filter-options hidden" ref={levelOptions}>
                    <div>
                        <input type="checkbox" name="all-levels" id={`all-levels--${props.instance}`} value="all" defaultChecked ref={lvAll} onChange={(e) => manageLevelFilter(e)}/>
                        <label htmlFor={`all-levels--${props.instance}`}>All Levels</label>
                    </div>
                    <hr/>
                    <div>
                        <input type="checkbox" name="level-1" id={`level-1--${props.instance}`} value="1" ref={lv1} onChange={(e) => manageLevelFilter(e)}/>
                        <label htmlFor={`level-1--${props.instance}`}>Level 1</label>
                    </div>
                    <div>
                        <input type="checkbox" name="level-2" id={`level-2--${props.instance}`} value="2" ref={lv2} onChange={(e) => manageLevelFilter(e)}/>
                        <label htmlFor={`level-2--${props.instance}`}>Level 2</label>
                    </div>
                    <div>
                        <input type="checkbox" name="level-3" id={`level-3--${props.instance}`} value="3" ref={lv3} onChange={(e) => manageLevelFilter(e)}/>
                        <label htmlFor={`level-3--${props.instance}`}>Level 3</label>
                    </div>
                </div>
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