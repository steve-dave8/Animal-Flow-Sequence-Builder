import React, { useEffect, useState, useRef } from 'react'

import { moveList } from '../../../helpers/getData.js'

import FormRandomFlow from './FormRandomFlow.js'

const CurrentFlow = (props) => {
    const [flowLength, setFlowLength] = useState("")
    const [randFlowFlag, setRandFlowFlag] = useState(false)

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
        if (randFlowFlag){
            currFlowList.current.scrollTop = 0
            setRandFlowFlag(false)
        }
        else if (selFlow && selFlow !== prevSelFlow){
            currFlowList.current.scrollTop = 0
        }
        else if (lengthChange === 1){
            currFlowList.current.scrollTop = currFlowList.current.scrollTopMax
        } 
    }, [props.flow])

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
                        <FormRandomFlow 
                            flowLength={flowLength} 
                            setFlowLength={setFlowLength}
                            setRandFlowFlag={setRandFlowFlag}
                            setMove={props.setMove}
                            setFlow={props.setFlow}
                        />
                        <hr style={{width: "80%"}}/>                    
                    </>
                    : <>
                        <p className="note">Note: removing a movement from the flow below will also remove all movements that follow it.</p>
                        <hr style={{width: "80%"}}/>
                        <FormRandomFlow 
                            flowLength={flowLength} 
                            setFlowLength={setFlowLength} 
                            setRandFlowFlag={setRandFlowFlag}
                            setMove={props.setMove}
                            setFlow={props.setFlow}
                        />
                        <hr style={{width: "80%"}}/>
                        <div className="btn-row">
                            <p className="form-title">Options:</p>
                            <button type="button" className='reset-btn' onClick={reset}><span>Reset</span></button>
                            <button type="button" className='mirror-btn' onClick={mirror}><span>Mirror</span></button>
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