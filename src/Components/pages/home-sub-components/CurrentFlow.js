import React, { useEffect, useState, useRef } from 'react'

import { basePositions, moveList } from '../../../helpers/getData.js'
import { shuffle } from '../../../helpers/shuffle.js'

import FormRandomFlow from './FormRandomFlow.js'

const CurrentFlow = (props) => {
    const [flowLength, setFlowLength] = useState("")
    const [error, setError] = useState(null)

    const currFlowList = useRef()

    function removeItem(){
        let itemIndex = this.dataset.index
        let currentFlow = props.flow.slice()
        currentFlow.splice(itemIndex)
        if (!currentFlow.length){
            props.setMove([])
            props.setFlow([])
        } else {
            let lastMove = currentFlow[currentFlow.length - 1]
            props.setMove(lastMove)
            props.setFlow(currentFlow)
        }
    }

    useEffect(() => {
        let removeBtns = Array.from(document.getElementsByClassName("fa-minus"))
        if (removeBtns.length){
            removeBtns.forEach(btn => btn.addEventListener("click", removeItem))
        }
        return () => {
            removeBtns.forEach(btn => btn.removeEventListener("click", removeItem))
        }
    })

    const prevFlowLengthRef = useRef()
    useEffect(() => {
        prevFlowLengthRef.current = props.flow.length
    })
    const prevFlowLength = prevFlowLengthRef.current

    const prevSelFlowRef = useRef()
    useEffect(() => {
        prevSelFlowRef.current = JSON.parse(window.localStorage.getItem('prevSelFlow'))
    })
    const prevSelFlow = prevSelFlowRef.current

    useEffect(() => {
        if (!props.flow.length) return
        const lengthChange = props.flow.length - prevFlowLength
        const selFlow = JSON.parse(window.localStorage.getItem('prevSelFlow'))
        if (flowLength){
            currFlowList.current.scrollTop = 0
            setFlowLength("")
        }
        else if (selFlow && selFlow !== prevSelFlow){
            currFlowList.current.scrollTop = 0
        }
        else if (lengthChange === 1){
            currFlowList.current.scrollTop = currFlowList.current.scrollTopMax
        } 
    }, [props.flow])

    const genRandomFlow = () => {
        let index = Math.floor(Math.random()*basePositions.length)
        let randomFlow = []
        let basePositionsDeck = basePositions.slice()
        shuffle(basePositionsDeck)
        let nextMove = moveList.find(x => x.move === basePositionsDeck[index].base)
        randomFlow.push(nextMove)
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
            let nextMovesDeck = lastMove.nextMoves.slice()
            shuffle(nextMovesDeck)
            do {
                index = Math.floor(Math.random()*nextMovesDeck.length)
                nextMove = nextMovesDeck[index]
            } while (lastMove.move.includes('set') && nextMove.includes('set'))

            let move = nextMove.split(' precursor ')
            let nextOption = moveList.filter(x => x.move === move[0])
            if (nextOption.length > 1){
                nextOption = nextOption.filter(x => x.precursor === move[1])
            }
            nextMove = nextOption[0]
            if (nextMove){
                randomFlow.push(nextMove)
            }
        }
        while (randomFlow.length < flowLength){
            addMove()
        }
        props.setMove(randomFlow[randomFlow.length - 1])
        props.setFlow(randomFlow)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!flowLength){
            setError("Error: length cannot be empty.")
            return
        }
        if (flowLength < 3){
            setError("Error: length cannot be less than 3.")
            return
        }
        if (flowLength > 30){
            setError("Error: length cannot be more than 30.")
            return
        }
        setError(null)
        genRandomFlow()        
    }

    const reset = () => {
        props.setMove([])
        props.setFlow([])
    }

    const mirror = () => {
        if (props.flow.length <= 1) return
        let mirrorFlow = []
        props.flow.forEach(x => {
            if (x.move.includes('left') || (x.precursor && x.precursor.includes('left'))){
                let mirrorMove = x.move.replace('left', 'right')
                if (x.precursor){
                    let mirrorPrecursor = x.precursor.replace('left', 'right')
                    let replacement = moveList.find(x => {
                        if (x.move === mirrorMove && x.precursor === mirrorPrecursor) return x
                    })
                    mirrorFlow.push(replacement)
                } else {
                    let replacement = moveList.find(x => x.move === mirrorMove) 
                    mirrorFlow.push(replacement)
                }
            } else if (x.move.includes('right') || (x.precursor && x.precursor.includes('right'))){
                let mirrorMove = x.move.replace('right', 'left')
                if (x.precursor){
                    let mirrorPrecursor = x.precursor.replace('right', 'left')
                    let replacement = moveList.find(x => {
                        if (x.move === mirrorMove && x.precursor === mirrorPrecursor) return x
                    })
                    mirrorFlow.push(replacement)
                } else {
                    let replacement = moveList.find(x => x.move === mirrorMove)
                    mirrorFlow.push(replacement)
                }                
            } else {
                mirrorFlow.push(x)
            }
        })
        props.setMove(mirrorFlow[mirrorFlow.length - 1])
        props.setFlow(mirrorFlow)
    }

    return (
        <section id="current-flow">
            <h2 id="current-flow-title">Current Flow</h2>
            <div id="current-flow-panel">
                {(!props.flow.length)
                    ? <><p className="para-instr">Let's get moving! 
                        Begin by selecting a starting position in the "Current Move" panel. Then, 
                        from the options provided, select the next movement and repeat to build a flow
                        which will appear here. Alternately, use the form below to create a random flow.</p>  
                        <hr style={{width: "80%"}}/>
                        <FormRandomFlow flowLength={flowLength} setFlowLength={setFlowLength} handleSubmit={handleSubmit} error={error}/>
                        <hr style={{width: "80%"}}/>                    
                    </>
                    : <>
                        <p className="note">Note: removing a movement from the flow below will also remove all movements that follow it.</p>
                        <hr style={{width: "80%"}}/>
                        <FormRandomFlow flowLength={flowLength} setFlowLength={setFlowLength} handleSubmit={handleSubmit} error={error}/>
                        <hr style={{width: "80%"}}/>
                        <div className="btn-row">
                            <p className="form-title">Options:</p>
                            <button type="button" style={{height: "fit-content", padding: "3px 6px"}} onClick={reset}>Reset</button>
                            <button type="button" style={{height: "fit-content", padding: "3px 6px"}} onClick={mirror}>Mirror</button>
                        </div>
                        <div id="current-flow-container">
                            <ul id="current-flow-list" ref={currFlowList}>
                                {props.flow.map((el, index) => {
                                    return (
                                        <li>
                                            <i data-index={index} className="fas fa-minus"></i>
                                            <p>
                                                <span style={{fontStyle: "italic"}}>{el.callout.keyPhrase} </span>
                                                <span>{el.callout.direction} </span>
                                                <span className="callout-command">{el.callout.command}</span>
                                            </p>
                                            <img src={el.imgSrc} alt={el.move}></img>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default CurrentFlow