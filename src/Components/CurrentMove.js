import React, { useEffect } from 'react'

import { moveList } from '../helpers/getData.js'

const CurrentMove = (props) => {
    function getMove(){
        let selectedMove
        let currentMove
        if (this.className === "base-item"){
            selectedMove = this.querySelector("p.para-base").innerText
            currentMove = moveList.find(x => x.move === selectedMove)
        }
        if (this.className === "fas fa-plus"){
            selectedMove = this.parentElement.querySelector("p").innerText
            currentMove = moveList.filter(x => x.move === selectedMove)
            if (currentMove.length > 1){
                currentMove = currentMove.filter(x => x.precursor === this.dataset.precursor)
            }
            currentMove = currentMove[0]
        }              
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

    const getNextMoves = () => {
        let nextMoves
        if (props.move.alias){
            let alias = props.move.alias
            if (alias.includes('precursor')){
                alias = alias.split(' precursor ')
                let foundMove = moveList.filter(x => {
                    if (x.move === alias[0] && x.precursor === alias[1]) return x
                })
                alias = foundMove[0]
            } else {
                alias = moveList.find(x => x.move === alias)
            }           
            nextMoves = alias.nextMoves
        } else {
            nextMoves = props.move.nextMoves 
        }   
        return nextMoves 
    }
    const nextMoves = getNextMoves()

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
                <div style={{display: "flex"}}>
                    <img src={props.move.imgSrc} alt={props.move.move} className="current-move-img"></img>
                    <div className="move-info">
                        <p>Level: {props.move.level}</p>
                        <p>Component: {props.move.component}</p>
                    </div>
                </div>                
                <div id="next-moves-panel">
                    <h3>Next Moves:</h3>
                    <div id="next-moves-container">
                        <ul id="next-moves-list">
                            {nextMoves.map( move => {
                                move = move.split(' precursor ')
                                let nextOption = moveList.filter(x => x.move === move[0])
                                if (nextOption.length > 1){
                                    nextOption = nextOption.filter(x => x.precursor === move[1])
                                }
                                nextOption = nextOption[0]
                                if (!nextOption){
                                    return null
                                } else {
                                return (
                                    <li>
                                        <i className="fas fa-plus" data-precursor={move[1]}></i>
                                        <p>
                                            <span style={{fontStyle: "italic"}}>{nextOption.callout.keyPhrase} </span>
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