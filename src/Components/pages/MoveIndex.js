import React, { useState, useEffect } from 'react'
import IndexList from './moveIndex-sub-components/IndexList'
import MoveInfo from './moveIndex-sub-components/MoveInfo'

const MoveIndex = () => {
    let prevMove = JSON.parse(window.localStorage.getItem('moveInfo'))

    const [move, setMove] = useState(prevMove || null)

    useEffect(() => {
        window.localStorage.setItem('moveInfo', JSON.stringify(move));
    }, [move]);

    return (
        <main id="move-index">
            <IndexList setMove={setMove}/>
            <MoveInfo move={move} setMove={setMove}/>
        </main>
    )
}

export default MoveIndex