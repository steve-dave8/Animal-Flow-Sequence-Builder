import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'

const SavedFlows = (props) => {
    const prevSelFlow = JSON.parse(window.localStorage.getItem('prevSelFlow'))
    const prevUnsaved = JSON.parse(window.localStorage.getItem('unsavedStatus'))

    const [selFlow, setSelFlow] = useState(prevSelFlow || "")
    const [savedFlows, setSavedFlows] = useState([])
    const [unsaved, setUnsaved] = useState(prevUnsaved || false)
    const [discarded, setDiscarded] = useState(false)

    useEffect(() => {
        window.localStorage.setItem('prevSelFlow', JSON.stringify(selFlow))
    }, [selFlow])

    useEffect(() => {
        window.localStorage.setItem('unsavedStatus', JSON.stringify(unsaved))
    }, [unsaved])

    const prevSelFlowRef = useRef()
    useEffect(() => {
        prevSelFlowRef.current = selFlow
    })
    const prevSelection = prevSelFlowRef.current

    useEffect(() => {
        if (selFlow === prevSelection) {
            if (discarded){
                setUnsaved(false)
                setDiscarded(false)
            } else {
                setUnsaved(true)
            }          
        }
    }, [props.flow])

    const getSavedFlows = async () => {
        const response = await fetch("http://localhost:4000/saved-flows", {method: "GET", mode: 'cors'})
        const data = await response.json()
        setSavedFlows(data)
    }

    const assignFlow = (e) => {
        if (!e.target.value) {
            clearSelection()
        } else {
            setSelFlow(e.target.value)
            setUnsaved(false)
            const savedFlow = savedFlows.find(x => x.id === e.target.value).flow
            props.setFlow(savedFlow)
            props.setMove(savedFlow[savedFlow.length - 1])
        }
    }

    const discardChanges = () => {
        setDiscarded(true)
        const savedFlow = savedFlows.find(x => x.id === selFlow).flow
        props.setFlow(savedFlow)
        props.setMove(savedFlow[savedFlow.length - 1])
    }

    const clearSelection = () => {
        setSelFlow("")
        props.setMove([])
        props.setFlow([])
    }

    const deleteFlow = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Are you sure you want to delete this flow? Deleted flows cannot be retrieved later.',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                (async function(){
                    await fetch (`http://localhost:4000/saved-flows/${selFlow}`, {
                        method: 'DELETE',
                        mode: 'cors'
                    })
                    clearSelection()
                    getSavedFlows()
                })()
            }
        })
    }

    const save = async () => {
        await fetch (`http://localhost:4000/saved-flows/${selFlow}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({flow: props.flow})
        })
    }

    const submitFlow = async (nameVal) => {
        const response = await fetch("http://localhost:4000/saved-flows", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: nameVal, flow: props.flow})
        })
        const payload = await response.json()
        if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                titleText: 'Error' ,
                text: payload,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Close'
            })
        } else {
            getSavedFlows()
            setSelFlow(payload.id)
            Swal.fire({
                icon: 'success',
                titleText: 'Success' ,
                text: `Flow saved with name '${nameVal}'`,
                confirmButtonColor: '#4BB543'
            })
        }
    }

    const saveAs = () => {
        Swal.fire({
            input: 'text',
            titleText: 'Save As',
            text: 'Enter a name for your flow:',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#4d79ff',
            allowOutsideClick: false,
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                const nameVal = result.value.trim()
                if (nameVal.length < 5 || nameVal.length > 50) {
                    Swal.fire({
                        icon: 'error',
                        titleText: 'Error',
                        text: 'The character length of the flow name must be at least 5 and no more than 50.',
                        showConfirmButton: false,
                        showCancelButton: true,
                        cancelButtonText: 'Close'
                    })
                } else {
                    submitFlow(nameVal)
                }
            }
        })
    }

    useEffect(() => getSavedFlows(), [])

    return (
        <div id="flow-management">
            <div>
                <p style={{display: 'inline-block'}}>Save your current flow: </p>
                <button type='button' disabled={!selFlow || props.flow.length < 3} className='btn-base save-btn' onClick={save}>Save</button>
                <button type='button' disabled={props.flow.length < 3} className='btn-base save-btn' onClick={saveAs}>Save As</button>
            </div>
            <div style={{paddingLeft: '4rem'}}>
                <p className='para-manage-flow'>Select a saved flow: </p>
                <select value={selFlow} style={{margin: "0 10px"}} onChange={assignFlow}>
                    {savedFlows.length
                        ?   <>
                                <option value="">--Select A Flow--</option>
                                {savedFlows.map(x => <option value={x.id}>{x.name}</option>)}
                            </>
                        :   <option value={null}>--N/A--</option>
                    }
                </select>
                {selFlow
                    ?   <>
                            <i class="fas fa-trash-alt" title="Delete" style={{marginRight: "1rem"}} onClick={deleteFlow}></i>
                            <i class="fas fa-window-close" title="Clear" onClick={clearSelection}></i>
                            {unsaved && 
                                <div style={{display: "inline-block", marginLeft: "2rem"}}>
                                    <span style={{fontStyle: "italic", paddingRight: "1rem"}}>Unsaved Changes</span>
                                    <i class="fas fa-undo" title="Discard Changes" onClick={discardChanges}></i>
                                </div>
                            }
                        </>
                    :   null
                }
            </div>
        </div>
    )
}

export default SavedFlows