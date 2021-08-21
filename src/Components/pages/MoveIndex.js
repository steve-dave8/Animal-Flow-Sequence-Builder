import React, { useState, useEffect } from 'react'
import IndexList from './moveIndex-sub-components/IndexList'
import MoveInfo from './moveIndex-sub-components/MoveInfo'

const MoveIndex = () => {
    const [move, setMove] = useState(null)

    return (
        <main id="move-index">
            <IndexList setMove={setMove}/>
            <MoveInfo move={move} setMove={setMove}/>
        </main>
    )
}

export default MoveIndex