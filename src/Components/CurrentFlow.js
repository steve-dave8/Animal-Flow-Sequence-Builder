import React, { useEffect } from 'react'

const CurrentFlow = (props) => {
    function removeItem(){
        let itemIndex = this.dataset.index
        let currentFlow = props.flow
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

    return (
        <section id="current-flow">
            <h2 id="current-flow-title">Current Flow</h2>
            <div id="current-flow-panel">
                {(!props.flow.length)
                    ? <p className="para-flow-instr">Let's get moving! You haven't selected any Animal Flow movements yet.
                        Begin by selecting a starting position in the "Current Move" panel. Then, 
                        from the options provided, select the next movement and repeat to build a flow
                        which will appear here.</p>
                    : <div id="current-flow-container">
                        <ul id="current-flow-list">
                            {props.flow.map((el, index) => {
                                return (
                                    <li>
                                        <i data-index={index} className="fas fa-minus"></i>
                                        <p>
                                            <span>{el.callout.keyPhrase} </span>
                                            <span>{el.callout.direction} </span>
                                            <span className="callout-command">{el.callout.command}</span>
                                        </p>
                                        <img src={el.imgSrc} alt={el.move}></img>
                                    </li>
                                )
                            })}
                        </ul>
                      </div>
                }
            </div>
        </section>
    )
}

export default CurrentFlow