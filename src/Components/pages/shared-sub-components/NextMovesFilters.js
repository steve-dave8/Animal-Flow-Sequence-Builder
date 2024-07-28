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
    const componentOptions = useRef()
    const componentArrow = useRef()

    function toggleLevelMenu(){
        levelOptions.current.classList.toggle("hidden")
        levelArrow.current.classList.toggle("rotate180")
    }

    function toggleComponentMenu() {
        componentOptions.current.classList.toggle("hidden")
        componentArrow.current.classList.toggle("rotate180")
    }

    const lvAll = useRef()
    const lv1 = useRef()
    const lv2 = useRef()
    const lv3 = useRef()

    const componentAll = useRef()
    const componentFSS = useRef()
    const componentST = useRef()
    const componentTF = useRef()

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

    function manageComponentFilter(e){
        const selection = e.target.value

        const clearComponents = () => {
            componentFSS.current.checked = false
            componentST.current.checked = false
            componentTF.current.checked = false
        }

        if (selection === "all") {
            clearComponents()
            props.setComponentFilter([])
            return
        }

        const newComponentFilter = [...props.componentFilter]

        if (e.target.checked) {
            // if all three component types are selected then empty the array
            if (newComponentFilter.length === 2) {
                newComponentFilter.length = 0
                componentAll.current.checked = true
                clearComponents()
            } else {
                newComponentFilter.push(selection)
                componentAll.current.checked = false
            }
        } else {
            const index = newComponentFilter.indexOf(selection)
            if (index > -1) newComponentFilter.splice(index, 1)
        }

        props.setComponentFilter(newComponentFilter)
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

            <div className="component-menu">
                <button type="button" onClick={toggleComponentMenu}>Component <i className="fas fa-chevron-down" ref={componentArrow}></i></button>
                <div className="component-options hidden" ref={componentOptions}>
                    <div>
                        <input type="checkbox" name="all-components" id={`all-components--${props.instance}`} value="all" defaultChecked ref={componentAll} onChange={(e) => manageComponentFilter(e)}/>
                        <label htmlFor={`all-components--${props.instance}`}>All Components</label>
                    </div>
                    <hr/>
                    <div>
                        <input type="checkbox" name="componentFSS" id={`componentFSS--${props.instance}`} value="form specific stretches" ref={componentFSS} onChange={(e) => manageComponentFilter(e)}/>
                        <label htmlFor={`componentFSS--${props.instance}`}>Form Specific Stretches</label>
                    </div>
                    <div>
                        <input type="checkbox" name="componentST" id={`componentST--${props.instance}`} value="switches and transitions" ref={componentST} onChange={(e) => manageComponentFilter(e)}/>
                        <label htmlFor={`componentST--${props.instance}`}>Switches and Transitions</label>
                    </div>
                    <div>
                        <input type="checkbox" name="componentTF" id={`componentTF--${props.instance}`} value="traveling forms" ref={componentTF} onChange={(e) => manageComponentFilter(e)}/>
                        <label htmlFor={`componentTF--${props.instance}`}>Traveling Forms</label>
                    </div>
                </div>
            </div>
                                        
        </>
    )
}

export default NextMovesFilters