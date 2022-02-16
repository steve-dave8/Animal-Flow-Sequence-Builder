import React, { useEffect, useState, useRef } from 'react'
import '../../../styles/home-page/current-flow.css'
import '../../../styles/callout-button.css'
import FormRandomFlow from './FormRandomFlow.js'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Modal from '@mui/material/Modal'

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: 'rgba(0, 0, 0, 0.87)'
    },
});

const CurrentFlow = (props) => {
    const [flowLength, setFlowLength] = useState("")
    const [randFlowFlag, setRandFlowFlag] = useState(false)
    const [open, setOpen] = useState(false)
    const [callout, setCallout] = useState("")
    const [shorthand, setShorthand] = useState("")

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
        prevSelFlowRef.current = window.localStorage.getItem('prevSelFlow')
    })
    const prevSelFlow = prevSelFlowRef.current

    useEffect(() => {
        if (!props.flow.length) return
        const lengthChange = props.flow.length - prevFlowLength
        const selFlow = window.localStorage.getItem('prevSelFlow')
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
                    let replacement = props.moveList.find(x => {
                        if (x.move === mirrorMove && x.precursor === mirrorPrecursor) return x
                    })
                    mirrorFlow.push(replacement)
                } else {
                    let replacement = props.moveList.find(x => x.move === mirrorMove) 
                    mirrorFlow.push(replacement)
                }
            } else if (x.move.includes('right') || (x.precursor && x.precursor.includes('right'))){
                let mirrorMove = x.move.replace('right', 'left')
                if (x.precursor){
                    let mirrorPrecursor = x.precursor.replace('right', 'left')
                    let replacement = props.moveList.find(x => {
                        if (x.move === mirrorMove && x.precursor === mirrorPrecursor) return x
                    })
                    mirrorFlow.push(replacement)
                } else {
                    let replacement = props.moveList.find(x => x.move === mirrorMove)
                    mirrorFlow.push(replacement)
                }                
            } else {
                mirrorFlow.push(x)
            }
        })
        props.setMove(mirrorFlow[mirrorFlow.length - 1])
        props.setFlow(mirrorFlow)
    }

    const calloutDisplay = () => {
        setOpen(true)
        let callout = []
        let shorthand = []

        props.flow.forEach(x => {
            if (callout.length) {
                if (x.move.search(/^(in)?to/g) !== -1) {
                    callout.push(" ")
                }
                else {
                    callout.push(", ")
                }
            } 
            callout.push(x.move)

            let cosh = x.callout.shorthand
            if (shorthand.length) {
                if (cosh) {
                    if (cosh.search("J -") !== -1 || cosh.search("L -") !== -1) {
                        shorthand.push(", ")
                    }
                    else if (cosh.search("- ") !== -1) {
                        shorthand.push(" ")
                    }
                    else {
                        shorthand.push(", ")
                    }
                    shorthand.push(cosh)
                } else {
                    shorthand.push(", ", x.move)
                }
            } 
            else {
                cosh ? shorthand.push(cosh, " (root)") : shorthand.push(x.move)
            }
        })

        setCallout(callout.join(''))
        setShorthand(shorthand.join(''))
    }

    const handleClose = () => {
        setOpen(false)
        setCallout("")
        setShorthand("")
    }

    const formRandFlow =    (<FormRandomFlow 
                                flowLength={flowLength} 
                                setFlowLength={setFlowLength}
                                setRandFlowFlag={setRandFlowFlag}
                                setMove={props.setMove}
                                setFlow={props.setFlow}
                                moveList={props.moveList}
                            />)

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
                        {formRandFlow}
                        <hr style={{width: "80%"}}/>                    
                    </>
                    : <>
                        <p className="note">Note: removing a movement from the flow below will also remove all movements that follow it.</p>
                        <hr style={{width: "80%"}}/>
                        {formRandFlow}
                        <hr style={{width: "80%"}}/>
                        <div className="btn-row">
                            <HtmlTooltip placement='bottom' title={
                                <>
                                   <strong>Reset:</strong> clears the current flow (cannot be undone).
                                   <br/>
                                   <strong>Mirror:</strong> swaps left and right.
                                   <br/>
                                   <strong>Callout:</strong> opens a modal with the full callout text and its associated shorthand form.
                                </>
                            }
                            >
                                <p style={{fontWeight: 'bold'}}>                               
                                    <i className="fas fa-info-circle"></i>
                                    Options:                               
                                </p>
                            </HtmlTooltip>
                            <button type="button" className='reset-btn' onClick={reset}><span>Reset</span></button>
                            <button type="button" className='mirror-btn' onClick={mirror}><span>Mirror</span></button>
                            <button type="button" className='callout-btn' onClick={calloutDisplay}>
                                <span>
                                    <span className='callout-let1'>C</span>
                                    <span className='callout-let2'>a</span>
                                    <span className='callout-let3'>l</span>
                                    <span className='callout-let4'>l</span>
                                    <span className='callout-let5'>o</span>
                                    <span className='callout-let6'>u</span>
                                    <span className='callout-let7'>t</span>
                                </span>
                            </button>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="callout-modal"
                aria-describedby="animal-flow--sequence-callout"
            >
                <div className='callout-modal'>
                    <div className='callout'>
                        <h3>Callout</h3>
                        <p>{callout}</p>                       
                    </div>
                    <div className='shorthand'>
                        <h3>Shorthand</h3>
                        <p>{shorthand}</p>
                    </div>
                </div>
            </Modal>
        </section>
    )
}

export default CurrentFlow