import React, { useEffect } from 'react'
import { NavLink as RouteLink } from 'react-router-dom'

import claws from '../../assets/Claws-Black.png'

const Navigation = () => {
    useEffect(() => {
        let hamburger = document.querySelector(".claws-menu")
        let menu = document.querySelector("nav")
        hamburger.addEventListener("click", function(){
            hamburger.classList.toggle("open-menu")
            menu.classList.toggle("reveal")
        })
    })

    return (
        <><header style={{display: "flex"}}>    
            <h1 id="main-title">Animal Flow Sequence Builder</h1>
            <div>              
                <img src={claws} className="claws-menu" alt=""></img>
            </div>   
        </header>
        <nav>
            <div><button type="button" className="btn-page" style={{borderLeft: "none"}}>Home</button></div>
            <div><button type="button" className="btn-page">Move Index</button></div>
            <div><button type="button" className="btn-page">Saved Flows</button></div>
            <div><button type="button" className="btn-page">Contact</button></div>        
        </nav></>
    )
}

export default Navigation