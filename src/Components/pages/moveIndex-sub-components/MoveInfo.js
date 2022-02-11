import React, { useEffect, useState } from 'react'
import NextMovesFilters from '../shared-sub-components/NextMovesFilters.js'

const MoveInfo = (props) => {
    const [levelFilter, setLevelFilter] = useState("")
    const [componentFilter, setComponentFilter] = useState("")
    const [nextMoves, setNextMoves] = useState([])

    function getMove(){
        let selectedMove = this.parentElement.querySelector("p").innerText
        let currentMove = props.moveList.filter(x => x.move === selectedMove)
        if (currentMove.length > 1){
            currentMove = currentMove.filter(x => x.precursor === this.dataset.precursor)
        }
        currentMove = currentMove[0]
        props.setMove(currentMove)
    }   

    const getNextMoves = () => {
        let nextMovesRef
        if (props.move.alias){
            let alias = props.move.alias
            if (alias.includes('precursor')){
                alias = alias.split(' precursor ')
                let foundMove = props.moveList.filter(x => {
                    if (x.move === alias[0] && x.precursor === alias[1]) return x
                })
                alias = foundMove[0]
            } else {
                alias = props.moveList.find(x => x.move === alias)
            }           
            nextMovesRef = alias.nextMoves
        } else {
            nextMovesRef = props.move.nextMoves 
        }  
        const findMove = (move) => {
            let moveKey = move.split(' precursor ')
            let nextOption = props.moveList.filter(x => x.move === moveKey[0])
            if (nextOption.length > 1){
                nextOption = nextOption.filter(x => x.precursor === moveKey[1])
            }
            nextOption = nextOption[0]
            return nextOption
        }
        let nextMovesList = []
        nextMovesRef.forEach(x => {
            let foundMove = findMove(x)
            if (foundMove){
                nextMovesList.push(foundMove)
            }
        })
        if (levelFilter || componentFilter){          
            let baseMoves = nextMovesList.filter(x => {
                if (x.component === "static activations"){
                    return x
                }
            })
            if (levelFilter){
                nextMovesList = nextMovesList.filter(x => x.level === levelFilter)
            }
            if (componentFilter){
                nextMovesList = nextMovesList.filter(x => x.component === componentFilter)
            }
            nextMovesList = baseMoves.concat(nextMovesList)
        }
        setNextMoves(nextMovesList)
    }

    const applyFilter = (event) => {
        event.preventDefault()
        getNextMoves()
    }

    useEffect(() => {
        if (props.move){
            getNextMoves()
        }
        // eslint-disable-next-line
    }, [props.move])

    useEffect(() => {
        let moveBtns = Array.from(document.getElementsByClassName("fa-info"))
        if (moveBtns.length){
            moveBtns.forEach(y => y.addEventListener("click", getMove))
        }
        return () => {
            moveBtns.forEach(y => y.removeEventListener("click", getMove))
        }
    })

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
                        <NextMovesFilters applyFilter={applyFilter} levelFilter={levelFilter} setLevelFilter={setLevelFilter} componentFilter={componentFilter} setComponentFilter={setComponentFilter}/>
                        <div id="next-moves-container">
                            <ul id="next-moves-list">
                                {nextMoves.length
                                    ? nextMoves.map(x => {
                                    return (
                                        <li>
                                            <i className="fas fa-info" data-precursor={x.precursor}></i>
                                            <p>
                                                <span style={{fontStyle: "italic"}}>{x.callout.keyPhrase} </span>
                                                <span>{x.callout.direction} </span>
                                                <span className="callout-command">{x.callout.command}</span>
                                            </p>
                                            <img src={x.imgSrc} alt={x.move}></img>
                                        </li>
                                    )
                                    })
                                    : <li className="filter-error">No next moves found. Try changing your filters.</li>
                                }
                            </ul>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}

export default MoveInfo