import React, { useState } from 'react'

import NextMovesFilters from '../shared-sub-components/NextMovesFilters.js'

import { basePositions, moveList } from '../../../helpers/getData.js'
import { shuffle } from '../../../helpers/shuffle.js'

const FormRandomFlow = (props) => {
    const [error, setError] = useState(null)
    const [levelFilter, setLevelFilter] = useState("")
    const [componentFilter, setComponentFilter] = useState("")
    const [reduceReps, setReduceReps] = useState(false)

    const genRandomFlow = () => {
        let randomFlow = []
        let basePositionsDeck = basePositions.slice()
        if (levelFilter === "2") {
            basePositionsDeck.splice(basePositionsDeck.findIndex(x => x.base === "set static beast"), 1) //no level 2 movements begin in this position
        }
        shuffle(basePositionsDeck)
        let index = Math.floor(Math.random()*(basePositions.length - 1))
        let nextMove = moveList.find(x => x.move === basePositionsDeck[index].base)
        randomFlow.push(nextMove)

        const findMove = (move) => {
            let moveKey = move.split(' precursor ')
            let nextOption = moveList.filter(x => x.move === moveKey[0])
            if (nextOption.length > 1){
                nextOption = nextOption.filter(x => x.precursor === moveKey[1])
            }
            nextOption = nextOption[0]
            return nextOption
        }

        let errors = 0

        const addMove = () => {
            let lastMove = randomFlow[randomFlow.length - 1]
            if (lastMove.alias){
                let alias = lastMove.alias
                if (alias.includes('precursor')){
                    alias = alias.split(' precursor ')
                    let foundMove = moveList.filter(x => {
                        if (x.move === alias[0] && x.precursor === alias[1]) return x
                    })
                    lastMove = foundMove[0]
                } else {
                    lastMove = moveList.find(x => x.move === alias)
                } 
            }
            let nextMovesList = lastMove.nextMoves.slice()
            let nextMovesDeck = []
            nextMovesList.forEach(x => {
                let foundMove = findMove(x)
                if (foundMove) nextMovesDeck.push(foundMove)
            })

            //Check for and apply filters:
            if (levelFilter || componentFilter){          
                let baseMoves = nextMovesDeck.filter(x => {
                    if (x.component === "static activations"){
                        return x
                    }
                })
                if (levelFilter){
                    nextMovesDeck = nextMovesDeck.filter(x => x.level === levelFilter)
                }
                if (componentFilter){
                    nextMovesDeck = nextMovesDeck.filter(x => x.component === componentFilter)
                }
                nextMovesDeck = baseMoves.concat(nextMovesDeck)
            }

            if (nextMovesDeck.length === 0) {
                console.log("Randomizer issue with move: ", lastMove)
                console.log(` with these filters applied: level filter - ${levelFilter}, component filter - ${componentFilter}. Issue: there are no next moves to choose from.`)
            }

            shuffle(nextMovesDeck)

            let attempts = 0
            if (reduceReps){
                let secondLastMove = randomFlow[randomFlow.length - 2];
                let thirdLastMove = randomFlow[randomFlow.length - 3];
                let isRepeated = false;
                do {
                    if (attempts >= 10) break
                    index = Math.floor(Math.random()*nextMovesDeck.length)
                    nextMove = nextMovesDeck[index]
                    if ((randomFlow.length >= 1) && (nextMove.move === lastMove.move) && (nextMove.precursor === lastMove.precursor)) {
                        isRepeated = true;
                    } else if ((randomFlow.length >= 2) && (nextMove.move === secondLastMove.move) && (nextMove.precursor === secondLastMove.precursor)) {
                        isRepeated = true;
                    } else if ((randomFlow.length >= 3) && (nextMove.move === thirdLastMove.move) && (nextMove.precursor === thirdLastMove.precursor)) {
                        isRepeated = true;
                    }
                    attempts++
                } while ((lastMove.move.includes('set') && nextMove.move.includes('set')) || isRepeated)
            } else {
                do {
                    if (attempts >= 10) break
                    index = Math.floor(Math.random()*nextMovesDeck.length)
                    nextMove = nextMovesDeck[index]
                    attempts++
                } while (lastMove.move.includes('set') && nextMove.move.includes('set'))
            }

            if (attempts >= 10) {
                randomFlow.pop()
                errors++
            } else {
                randomFlow.push(nextMove)
            }
        }
        while (randomFlow.length < props.flowLength){
            if (errors >= 10) {
                setError(`Error: unable to reach desired flow length of ${props.flowLength}. Actual length reached: ${randomFlow.length}. Please try again or adjust your filters.`)
                break
            } 
            addMove()
        }
        props.setRandFlowFlag(true)
        props.setMove(randomFlow[randomFlow.length - 1])
        props.setFlow(randomFlow)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!props.flowLength){
            setError("Error: length cannot be empty.")
            return
        }
        if (props.flowLength < 3){
            setError("Error: length cannot be less than 3.")
            return
        }
        if (props.flowLength > 30){
            setError("Error: length cannot be more than 30.")
            return
        }
        setError(null)
        genRandomFlow()        
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: "16px"}} >
            <p className="form-title">Generate Random Flow</p>
            <div className="form-grid">
                <section style={{padding: "0 1rem"}}>
                    <div className='randflow-row1'>
                        <div>
                            <label htmlFor="flow-length">Length: </label>
                            <input id="flow-length" type="number" required min="3" max="30" placeholder="min 3, max 30" value={props.flowLength} onChange={e => props.setFlowLength(parseInt(e.target.value))}></input>
                        </div>
                        <div style={{marginLeft: "2rem"}}>
                            <label>Reduce Repetition: </label>
                            <input type="checkbox" style={{transform: "scale(1.5)"}} value={reduceReps} onClick={e => setReduceReps(e.target.checked)}/>
                        </div>
                    </div>
                    <div className="next-moves-filters" style={{color: "white"}}>
                        <NextMovesFilters levelFilter={levelFilter} setLevelFilter={setLevelFilter} componentFilter={componentFilter} setComponentFilter={setComponentFilter}/>
                    </div>
                </section>
                <button type="submit" className="af-btn">Submit</button>
            </div>
            <div className={`error ${!error ? "hidden" : ""}`}>{error}</div>
        </form> 
    )
}

export default FormRandomFlow