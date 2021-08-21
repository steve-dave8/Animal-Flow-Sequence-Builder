import React, { useState } from 'react'

import { moveList } from '../../../helpers/getData'

const IndexList = (props) => {
    const SAmoveList = moveList.filter(x => x.component === "static activations")
    const FSSmoveList = moveList.filter(x => x.component === "form specific stretches")
    const STmoveList = moveList.filter(x => x.component === "switches and transitions")
    
    const [tab, setTab] = useState("All")
    const [index, setIndex] = useState(moveList)

    const changeTab = (e) => {
        switch (e.target.innerText){
            case "All":
                setTab("All")
                setIndex(moveList)
                break
            case "SA":
                setTab("SA")
                setIndex(SAmoveList)
                break
            case "FSS":
                setTab("FSS")
                setIndex(FSSmoveList)
                break
            case "S&T":
                setTab("S&T")
                setIndex(STmoveList)
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
        <section className="panel" style={{height: "500px"}}>
            <h2 className="panel-title">Move Index</h2>
            <nav id="index-nav">
                <div className={tab === "All" ? "active-tab" : ""} onClick={changeTab}>
                    <p>All</p>
                </div>
                <div className={tab === "SA" ? "active-tab" : ""} onClick={changeTab}>
                    <p>SA</p>
                </div>
                <div className={tab === "FSS" ? "active-tab" : ""} onClick={changeTab}>
                    <p>FSS</p>
                </div>
                <div className={tab === "S&T" ? "active-tab" : ""} onClick={changeTab}>
                    <p>S&T</p>
                </div>
                <div>
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