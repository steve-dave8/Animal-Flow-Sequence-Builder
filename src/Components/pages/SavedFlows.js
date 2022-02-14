import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import Tooltip from '@mui/material/Tooltip'

const SavedFlows = (props) => {
    const prevSelFlow = window.localStorage.getItem('prevSelFlow')
    const prevUnsaved = JSON.parse(window.localStorage.getItem('unsavedStatus'))

    const [selFlow, setSelFlow] = useState(prevSelFlow || "") //flow id
    const [savedFlows, setSavedFlows] = useState([])
    const [unsaved, setUnsaved] = useState(prevUnsaved || false)
    const [discarded, setDiscarded] = useState(false)
    const [flowID, setFlowID] = useState(props.token ? '_id' : 'id')

    useEffect(() => {
        window.localStorage.setItem('prevSelFlow', selFlow)
    }, [selFlow])

    useEffect(() => {
        window.localStorage.setItem('unsavedStatus', JSON.stringify(unsaved))
    }, [unsaved])

    useEffect(() => {
        setFlowID(props.token ? '_id' : 'id')
    }, [props.token])

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
        let response
        if (props.token) {
            const userEmail = window.localStorage.getItem('userEmail')
            response = await fetch(`${process.env.REACT_APP_BACKEND}/users/saved-flows/${userEmail}`, {
                method: 'GET', 
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            })
        } else {
            response = await fetch(`${process.env.REACT_APP_BACKEND}/saved-flows`, {method: "GET", mode: 'cors'})
        }      
        const data = await response.json()
        setSavedFlows(data)
    }

    const assignFlow = (e) => {
        if (!e.target.value) {
            clearSelection()
        } else {
            setSelFlow(e.target.value)
            setUnsaved(false)
            const savedFlow = savedFlows.find(x => x[`${flowID}`] === e.target.value).flow
            props.setFlow(savedFlow)
            props.setMove(savedFlow[savedFlow.length - 1])
        }
    }

    const discardChanges = () => {
        setDiscarded(true)
        const savedFlow = savedFlows.find(x => x[`${flowID}`] === selFlow).flow
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
                if (props.token) {
                    (async function(){
                        await fetch (`${process.env.REACT_APP_BACKEND}/users/saved-flows/${selFlow}`, {
                            method: 'DELETE',
                            mode: 'cors',
                            headers: {
                                'Authorization': `Bearer ${props.token}`
                            }
                        })
                        clearSelection()
                        getSavedFlows()
                    })()
                } else {
                    (async function(){
                        await fetch (`${process.env.REACT_APP_BACKEND}/saved-flows/${selFlow}`, {
                            method: 'DELETE',
                            mode: 'cors'
                        })
                        clearSelection()
                        getSavedFlows()
                    })()
                }
            }
        })
    }

    const save = async () => {
        if (props.flow.length < 3) return
        setUnsaved(false)
        if (props.token) {
            await fetch (`${process.env.REACT_APP_BACKEND}/users/saved-flows/${selFlow}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({flow: props.flow})
            })
        } else {
            await fetch (`${process.env.REACT_APP_BACKEND}/saved-flows/${selFlow}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({flow: props.flow})
            })
        }
    }

    const submitFlow = async (nameVal) => {
        let response
        if (props.token) {
            const userEmail = window.localStorage.getItem('userEmail')
            response = await fetch(`${process.env.REACT_APP_BACKEND}/users/saved-flows`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({userEmail, name: nameVal, flow: props.flow})
            })
        } else {
            response = await fetch(`${process.env.REACT_APP_BACKEND}/saved-flows`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({name: nameVal, flow: props.flow})
            })
        }       
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
            setSelFlow(payload[`${flowID}`])
            setUnsaved(false)
            Swal.fire({
                icon: 'success',
                titleText: 'Success' ,
                text: `Flow saved with name '${nameVal}'`,
                confirmButtonColor: '#4BB543'
            })
        }
    }

    const saveAs = () => {
        if (props.flow.length < 3) return
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

    useEffect(() => getSavedFlows(), [props.token])

    return (
        <div id="flow-management">
            <div>
                <p style={{display: 'inline-block'}}>
                    <Tooltip placement='top' title='Saved flows must contain at least 3 movements.'>
                        <i className="fas fa-info-circle"></i>
                    </Tooltip>
                    Save your current flow: 
                </p>
                <button type='button' disabled={!selFlow || props.flow.length < 3} className='btn-base save-btn' onClick={save}>Save</button>
                <button type='button' disabled={props.flow.length < 3} className='btn-base save-btn' onClick={saveAs}>Save As</button>
            </div>
            <div>
                <p className='para-manage-flow'>Select a saved flow: </p>
                <select value={selFlow} style={{margin: "0 10px"}} onChange={assignFlow}>
                    {savedFlows.length
                        ?   <>
                                <option value="">--Select A Flow--</option>
                                {savedFlows.map(x => <option value={x[`${flowID}`]}>{x.name}</option>)}
                            </>
                        :   <option value={null}>--N/A--</option>
                    }
                </select>
                {selFlow
                    ?   <>
                            <i className="fas fa-trash-alt" title="Delete" style={{marginRight: "1rem"}} onClick={deleteFlow}></i>
                            <i className="fas fa-window-close" title="Clear" onClick={clearSelection}></i>
                            {unsaved && 
                                <div style={{display: "inline-block", marginLeft: "2rem"}}>
                                    <span style={{fontStyle: "italic", paddingRight: "1rem"}}>Unsaved Changes</span>
                                    <i className="fas fa-undo" title="Discard Changes" onClick={discardChanges}></i>
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