import React, { useEffect } from 'react'

import { moveList } from '../../../helpers/getData.js'

const MoveInfo = (props) => {
    function getMove(){
        let selectedMove = this.parentElement.querySelector("p").innerText
        let currentMove = moveList.filter(x => x.move === selectedMove)
        if (currentMove.length > 1){
            currentMove = currentMove.filter(x => x.precursor === this.dataset.precursor)
        }
        currentMove = currentMove[0]
        props.setMove(currentMove)
    }   

    useEffect(() => {
        let moveBtns = Array.from(document.getElementsByClassName("fa-info"))
        if (moveBtns.length){
            moveBtns.forEach(y => y.addEventListener("click", getMove))
        }
        return () => {
            moveBtns.forEach(y => y.removeEventListener("click", getMove))
        }
    })

    const getNextMoves = () => {
        if (!props.move) return
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
        <section className="panel">
            <h2 className="panel-title">Move Info</h2>
            {!props.move
                ? <p className="para-instr">
                    Select a move from the "Move Index" panel to view more information about it here. 
                    Movements that are effectively the same, but with a different callout, are indented and 
                    will appear smaller. Click the nearest, regular-styled move above it to get info.
                  </p>
                : <>
                    <p className="para-current-move">{props.move.move}</p>
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
                                            <i className="fas fa-info" data-precursor={move[1]}></i>
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
            }
        </section>
    )
}

export default MoveInfo