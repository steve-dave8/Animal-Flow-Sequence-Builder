import React, { useState } from 'react'

const IndexList = (props) => {  
    const uniqueMoveList = props.moveList.filter(x => !x.alias)
    const SAmoveList = props.moveList.filter(x => x.component === "static activations")
    const uniqueSAmoveList = SAmoveList.filter(x => !x.alias)
    const FSSmoveList = props.moveList.filter(x => x.component === "form specific stretches")
    const uniqueFSSmoveList = FSSmoveList.filter(x => !x.alias)
    const STmoveList = props.moveList.filter(x => x.component === "switches and transitions")
    const uniqueSTmoveList = STmoveList.filter(x => !x.alias) 

    const [tab, setTab] = useState("All")
    const [index, setIndex] = useState(props.moveList)

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
            <header id="index-header">
                <h2 className="panel-title">Move Index</h2>
                <div id="index-banner">
                    <p style={{fontWeight: "bold"}}>Total: {index.length}</p>
                    <div>
                        <label htmlFor="unique-filter" onClick={filterList} >
                            Show unique moves only: 
                            <input type="checkbox" id="unique-filter"/>
                        </label>
                    </div>
                </div>
            </header>
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
                <div title="coming soon...">
                    <p>TF</p>
                </div>
            </nav>
            <div id="index-container">
                <ul id="index-list">
                    {index.map(x => {
                        return (<li className={`move-name ${x.alias ? "alias" : ""}`} onClick={(e) => getInfo(e, x)}>
                                    {x.move}{x.precursor ? ` (precursor: ${x.precursor})` : ""}
                                </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default IndexList