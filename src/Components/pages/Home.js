import React, { useState, useEffect } from 'react'
import CurrentMove from './home-sub-components/CurrentMove'
import CurrentFlow from './home-sub-components/CurrentFlow'

const Home = () => {
    let prevFlow = JSON.parse(window.localStorage.getItem('flow'))
    let lastMove = prevFlow[prevFlow.length - 1]

    const [move, setMove] = useState(lastMove || [])
    const [flow, setFlow] = useState(prevFlow || [])

    useEffect(() => {
        window.localStorage.setItem('flow', JSON.stringify(flow));
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
        <main id="home-page">
            <CurrentMove move={move} setMove={setMove} setFlow={setFlow}/>
            <CurrentFlow flow={flow} setMove={setMove} setFlow={setFlow}/>
        </main>
    )
}

export default Home