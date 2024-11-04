import React, { useState, useRef } from 'react'
import NextMovesFilters from '../shared-sub-components/NextMovesFilters.js'
import '../../../styles/search.css'

const Search = (props) => { 
    const [levelFilter, setLevelFilter] = useState([])
    const [componentFilter, setComponentFilter] = useState([])
    const [searchError, setSearchError] = useState("")

    const actionOptions = useRef()
    const actionArrow = useRef()
    const directionOptions = useRef()
    const directionArrow = useRef()

    function toggleActionMenu(){
        actionOptions.current.classList.toggle("hidden")
        actionArrow.current.classList.toggle("rotate180")
    }

    function toggleDirectionMenu(){
        directionOptions.current.classList.toggle("hidden")
        directionArrow.current.classList.toggle("rotate180")
    }

    const search = (event) => {
        event.preventDefault()
        const formItems = event.target.elements   
        const action = Array.from(formItems['action-field'].elements).find(el => el.checked).value
        const direction = Array.from(formItems['direction-field'].elements).find(el => el.checked).value
        const searchTerms = formItems['search-text'].value

        let results = [...props.moveList]

        if (levelFilter.length){
            results = results.filter(x => levelFilter.includes(x.level))
        }
        if (componentFilter.length){
            results = results.filter(x => componentFilter.includes(x.component))
        }
        if (action){
            if (action === "into"){
                results = results.filter(x => x.callout.keyPhrase === action || x.callout.keyPhrase === "to")
            } else {
                results = results.filter(x => x.callout.keyPhrase === action)
            }
        }
        if (direction){
            results = results.filter(x => x.callout.direction && x.callout.direction.includes(direction))
        }
        if (searchTerms){
            results = results.filter(x => x.move.includes(searchTerms))
        }

        if (results.length) {
            setSearchError("")
            props.setResults(results)
        } else {
            setSearchError("No search results found for these parameters.")
            props.setResults([])
        }

    }

    return (
        <form id="search-form" onSubmit={search}>
            <p>Search Form</p>

            <div>
                <span>Options: </span>

                <div className='action-menu'>
                    <button type="button" onClick={toggleActionMenu}>Action: <i className="fas fa-chevron-down" ref={actionArrow}></i></button>
                    <div className="action-options hidden" ref={actionOptions}>
                        <fieldset id='action-field'>
                            <div>
                                <input type='radio' name='action' id='any-action' value='' defaultChecked/>
                                <label for='any-action'>any</label>
                            </div>
                            <hr/>
                            <div>
                                <input type='radio' name='action' id='set' value='set' />
                                <label for='set'>set</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='into' value='into' />
                                <label for='into'>to/into</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='return' value='return to' />
                                <label for='return'>return to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='pop-back' value='pop back to' />
                                <label for='pop-back'>pop back to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='slide' value='slide to' />
                                <label for='slide'>slide to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='high-hip-slide' value='high hip slide to' />
                                <label for='high-hip-slide'>high hip slide to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='jump' value='jump to' />
                                <label for='jump'>jump to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='levitate' value='levitate to' />
                                <label for='levitate'>levitate to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='leap' value='leap to' />
                                <label for='leap'>leap to</label>
                            </div>
                            <div>
                                <input type='radio' name='action' id='float' value='float to' />
                                <label for='float'>float to</label>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div className='direction-menu'>
                    <button type="button" onClick={toggleDirectionMenu}>Direction/Limb: <i className="fas fa-chevron-down" ref={directionArrow}></i></button>
                    <div className="direction-options hidden" ref={directionOptions}>
                        <fieldset id='direction-field'>
                            <div>
                                <input type='radio' name='direction' id='any-direction' value='' defaultChecked/>
                                <label for='any-direction'>any</label>
                            </div>
                            <hr/>
                            <div>
                                <input type='radio' name='direction' id='left' value='left'/>
                                <label for='left'>left</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='left-leg' value='left leg'/>
                                <label for='left-leg'>left leg</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='left-arm' value='left arm'/>
                                <label for='left-arm'>left arm</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='right' value='right'/>
                                <label for='right'>right</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='right-leg' value='right leg'/>
                                <label for='right-leg'>right leg</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='right-arm' value='right arm'/>
                                <label for='right-arm'>right arm</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='side' value='side'/>
                                <label for='side'>side</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='left-side' value='left side'/>
                                <label for='left-side'>left side</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='right-side' value='right side'/>
                                <label for='right-side'>right side</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='forward' value='forward'/>
                                <label for='forward'>forward</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='reverse' value='reverse'/>
                                <label for='reverse'>reverse</label>
                            </div>
                            <div>
                                <input type='radio' name='direction' id='lateral' value='lateral'/>
                                <label for='lateral'>lateral</label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div>
                <label for='search-text'>Search terms: </label>
                <input type='text' id='search-text'/>
            </div>

            <div id='search-filters'>
                <NextMovesFilters instance="Search" levelFilter={levelFilter} setLevelFilter={setLevelFilter} componentFilter={componentFilter} setComponentFilter={setComponentFilter}/>
            </div>

            <button type="submit" id='search-btn'>Search</button>

            <span id="search-error" className={searchError ? "" : "hidden"}>{searchError}</span>

        </form>
    )

}

export default Search