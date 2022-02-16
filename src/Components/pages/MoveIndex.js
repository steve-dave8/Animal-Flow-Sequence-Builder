import React, { useState, useEffect } from 'react'
import '../../styles/move-index-page.css'
import IndexList from './moveIndex-sub-components/IndexList'
import MoveInfo from './moveIndex-sub-components/MoveInfo'

const MoveIndex = (props) => {
    let prevMove = JSON.parse(window.localStorage.getItem('moveInfo'))

    const [move, setMove] = useState(prevMove || null)

    useEffect(() => {
        window.localStorage.setItem('moveInfo', JSON.stringify(move));
    }, [move]);

    return (
        <main id="move-index">
            <IndexList setMove={setMove} moveList={props.moveList} />
            <MoveInfo move={move} setMove={setMove} moveList={props.moveList} />
        </main>
    )
}

export default MoveIndex