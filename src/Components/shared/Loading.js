import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color, containerClass }) => {
    return (
        <div className={containerClass}>
            <ReactLoading width={'20%'} height={'auto'} type={type} color={color} />
        </div>
    )
}

export default Loading