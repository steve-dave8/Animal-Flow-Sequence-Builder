import React, { useState, useEffect } from 'react'
import CurrentMove from './home-sub-components/CurrentMove'
import CurrentFlow from './home-sub-components/CurrentFlow'

const Home = () => {
    const [move, setMove] = useState([])
    const [flow, setFlow] = useState([])

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