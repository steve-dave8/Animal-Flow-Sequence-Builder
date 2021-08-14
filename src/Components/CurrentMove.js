import React, { useEffect } from 'react'

import { moveList } from '../assets/movelist'

const CurrentMove = (props) => {
    function getMove(){
        let selectedMove
        if (this.className === "base-item"){
            selectedMove = this.querySelector("p.para-base").innerText
        }
        if (this.className === "fas fa-plus"){
            selectedMove = this.parentElement.querySelector("p").innerText
        }       
        let currentMove = moveList.find(x => x.move === selectedMove)
        props.setFlow(currentFlow => [...currentFlow, currentMove])
        props.setMove(currentMove)
    }   

    useEffect(() => {
        let baseBtns = Array.from(document.getElementsByClassName("base-item"))
        let moveBtns = Array.from(document.getElementsByClassName("fa-plus"))
        if (baseBtns.length){
            baseBtns.forEach(x => x.addEventListener("click", getMove))
        }
        if (moveBtns.length){
            moveBtns.forEach(y => y.addEventListener("click", getMove))
        }
        return () => {
            baseBtns.forEach(x => x.removeEventListener("click", getMove))
            moveBtns.forEach(y => y.removeEventListener("click", getMove))
        }
    })

    console.log(props.move.nextMoves)

    return (
        <section id="current-move">
            <h2 id="current-move-title">Current Move</h2>
            {(Array.isArray(props.move) && !props.move.length)
                ? null
                : (props.move.length
                    ? <><p className="para-description">Select a starting position</p>
                    <ul>
                        {props.move.map( x => {
                            return (
                            <li className="base-item">
                                <p className="para-base">{x.base}</p>
                                <img src={x.imgSrc} alt={x.base} className="base-img"></img>
                            </li>
                            )
                        })}
                    </ul></>
                : <><p className="para-current-move">{props.move.move}</p>
                <img src={props.move.imgSrc} alt={props.move.move} className="current-move-img"></img>
                <div id="next-moves-panel">
                    <h3>Next Moves:</h3>
                    <div id="next-moves-container">
                        <ul id="next-moves-list">
                            {props.move.nextMoves.map( x => {
                                let nextOption = moveList.find(y => y.move === x)
                                if (!nextOption){
                                    return null
                                } else {
                                return (
                                    <li>
                                        <i className="fas fa-plus"></i>
                                        <p>
                                            <span>{nextOption.callout.keyPhrase} </span>
                                            <span>{nextOption.callout.direction} </span>
                                            <span className="callout-command">{nextOption.callout.command}</span>
                                        </p>
                                        <img src={nextOption.imgSrc} alt={nextOption.move}></img>
                                    </li>
                                )}
                            })}
                        </ul>
                    </div>
                </div>
                </>
                )
            }
        </section>
    )
}

export default CurrentMove