import React, { useState } from 'react'
import Search from './Search'

const exceptions = [
    "set static beast",
    "set static crab",
    "set deep ape",
    "set loaded beast",
    "jump to left leg forward traveling side kickthrough",
    "jump to right leg forward traveling side kickthrough",
    "jump to left leg reverse traveling side kickthrough",
    "jump to right leg reverse traveling side kickthrough"
]

const IndexList = (props) => {  
    const uniqueMoveList = props.moveList.filter(x => {
        return exceptions.includes(x.move) || !x.callout.keyPhrase
    })
    const SAmoveList = props.moveList.filter(x => x.component === "static activations")
    const uniqueSAmoveList = SAmoveList.filter(x => {
        return exceptions.includes(x.move) || !x.callout.keyPhrase
    })
    const FSSmoveList = props.moveList.filter(x => x.component === "form specific stretches")
    const uniqueFSSmoveList = FSSmoveList.filter(x => {
        return exceptions.includes(x.move) || !x.callout.keyPhrase
    })
    const STmoveList = props.moveList.filter(x => x.component === "switches and transitions")
    const uniqueSTmoveList = STmoveList.filter(x => {
        return exceptions.includes(x.move) || !x.callout.keyPhrase
    }) 
    const TFmoveList = props.moveList.filter(x => x.component === "traveling forms")
    const uniqueTFmoveList = TFmoveList.filter(x => {
        return exceptions.includes(x.move) || !x.callout.keyPhrase
    })

    const [tab, setTab] = useState("All")
    const [index, setIndex] = useState(props.moveList)
    const [results, setResults] = useState([])

    const changeTab = (e) => {
        const uniqueFilter = document.getElementById('unique-filter')
        switch (e.target.innerText){
            case "All":
                setTab("All")
                uniqueFilter.checked ? setIndex(uniqueMoveList) : setIndex(props.moveList)
                break
            case "SA":
                setTab("SA")
                uniqueFilter.checked ? setIndex(uniqueSAmoveList) : setIndex(SAmoveList)
                break
            case "FSS":
                setTab("FSS")
                uniqueFilter.checked ? setIndex(uniqueFSSmoveList) : setIndex(FSSmoveList)
                break
            case "S&T":
                setTab("S&T")
                uniqueFilter.checked ? setIndex(uniqueSTmoveList) : setIndex(STmoveList)
                break
            case "TF":
                setTab("TF")
                uniqueFilter.checked ? setIndex(uniqueTFmoveList) : setIndex(TFmoveList)
                break
            default:
                //do nothing
        }
    }

    const filterList = () => {
        const uniqueFilter = document.getElementById('unique-filter')
        switch (tab){
            case "All":
                uniqueFilter.checked ? setIndex(uniqueMoveList) : setIndex(props.moveList)
                break
            case "SA":
                uniqueFilter.checked ? setIndex(uniqueSAmoveList) : setIndex(SAmoveList)
                break
            case "FSS":
                uniqueFilter.checked ? setIndex(uniqueFSSmoveList) : setIndex(FSSmoveList)
                break
            case "S&T":
                uniqueFilter.checked ? setIndex(uniqueSTmoveList) : setIndex(STmoveList)
                break
            case "TF":
                uniqueFilter.checked ? setIndex(uniqueTFmoveList) : setIndex(TFmoveList)
                break
            default:
                //do nothing
        }
    }

    const getInfo = (event, move) => {
        event.preventDefault()
        props.setMove(move)
    }

    return (
        <section className="panel" style={{height: "fit-content"}}>
            <h2 className="panel-title">Move Index</h2>
            <Search setResults={setResults} moveList={props.moveList}/>
            <div id="list-wrapper">
                <div className={results.length ? "" : "hidden"} id="results-wrapper">
                    <div id="results-banner">
                        <p style={{fontWeight: "bold"}}>Total: {results.length}</p>
                        <p id="text-results">Search Results:</p>
                        <div className='close-btn' onClick={() => setResults([])}>X</div>
                    </div>
                    <div id='results-container'>
                        <ul id='results-list'>
                            {results.map(x => {
                                return (<li className={`move-name ${!exceptions.includes(x.move) && x.callout.keyPhrase ? "alias" : ""}`} onClick={(e) => getInfo(e, x)}>
                                            {x.move}{x.precursor ? ` (precursor: ${x.precursor})` : ""}
                                        </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <div id="index-banner">
                        <p style={{fontWeight: "bold"}}>Total: {index.length}</p>
                        <div>
                            <label htmlFor="unique-filter" onClick={filterList} >
                                Show unique moves only: 
                                <input type="checkbox" id="unique-filter"/>
                            </label>
                        </div>
                    </div>
                    <nav id="index-nav">
                        <div className={tab === "All" ? "active-tab" : ""} onClick={changeTab}>
                            <p>All</p>
                        </div>
                        <div className={tab === "SA" ? "active-tab" : ""} onClick={changeTab} title="Static Activations">
                            <p>SA</p>
                        </div>
                        <div className={tab === "FSS" ? "active-tab" : ""} onClick={changeTab} title="Form Specific Stretches">
                            <p>FSS</p>
                        </div>
                        <div className={tab === "S&T" ? "active-tab" : ""} onClick={changeTab} title="Switches & Transitions">
                            <p>S&T</p>
                        </div>
                        <div className={tab === "TF" ? "active-tab" : ""} onClick={changeTab} title="Traveling Forms">
                            <p>TF</p>
                        </div>
                    </nav>
                    <div id="index-container">
                        <ul id="index-list">
                            {index.map(x => {
                                return (<li className={`move-name ${!exceptions.includes(x.move) && x.callout.keyPhrase ? "alias" : ""}`} onClick={(e) => getInfo(e, x)}>
                                            {x.move}{x.precursor ? ` (precursor: ${x.precursor})` : ""}
                                        </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IndexList