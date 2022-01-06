import React, { useState, useEffect } from 'react'
import CurrentMove from './home-sub-components/CurrentMove'
import CurrentFlow from './home-sub-components/CurrentFlow'
import SavedFlows from './SavedFlows'

const Home = () => {
    const prevFlow = JSON.parse(window.localStorage.getItem('flow'))

    const [move, setMove] = useState((prevFlow && prevFlow[prevFlow.length - 1]) || [])
    const [flow, setFlow] = useState(prevFlow || [])

    useEffect(() => {
        window.localStorage.setItem('flow', JSON.stringify(flow))
    }, [flow]);
    
    useEffect(() => {
        const getBasePositions = async () => {
            const response = await fetch("http://localhost:4000/base-positions/", {method: "GET", mode: 'cors'})
            const data = await response.json()
            setMove(data)
        }
        if (Array.isArray(move) && !move.length){
            getBasePositions()
        }
    })

    return (
        <>
            <SavedFlows flow={flow} setMove={setMove} setFlow={setFlow}/>
            <main id="home-page">
                <CurrentMove move={move} setMove={setMove} setFlow={setFlow}/>
                <CurrentFlow flow={flow} setMove={setMove} setFlow={setFlow}/>
            </main>
        </>
    )
}

export default Home