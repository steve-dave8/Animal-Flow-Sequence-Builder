import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import claws from '../../assets/Claws-Black.png'

const Navigation = () => {
    useEffect(() => {
        let hamburger = document.querySelector(".claws-menu")
        let menu = document.getElementById("topnav")
        function toggleMenu(){
            hamburger.classList.toggle("open-menu")
            menu.classList.toggle("reveal")
        }
        hamburger.addEventListener("click", toggleMenu)
        let pageBtns = Array.from(document.querySelectorAll(".btn-page"))
        pageBtns.forEach(btn => btn.addEventListener("click", toggleMenu))
    })

    return (
        <><header style={{display: "flex"}}>    
            <h1 id="main-title">Animal Flow Sequence Builder</h1>
            <div>              
                <img src={claws} className="claws-menu" alt=""></img>
            </div>   
        </header>
        <nav id="topnav">
            <div>
                <NavLink to="/" style={{textDecoration: "none"}}>
                    <button type="button" className="btn-page" style={{borderLeft: "none"}}>Home</button>
                </NavLink>
            </div>
            <div>
                <NavLink to="/move-index" style={{textDecoration: "none"}}>
                    <button type="button" className="btn-page">Move Index</button>
                </NavLink>
            </div>
            <div>
                <NavLink to="/" style={{textDecoration: "none"}}>
                    <button type="button" className="btn-page">Login</button>
                </NavLink>
            </div>
            <div>
                <NavLink to="/" style={{textDecoration: "none"}}>
                    <button type="button" className="btn-page">Contact</button>
                </NavLink>
            </div>        
        </nav></>
    )
}

export default Navigation