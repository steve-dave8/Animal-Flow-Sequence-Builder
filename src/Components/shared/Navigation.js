import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import '../../styles/header.css'
import claws from '../../assets/Claws-Black.png'

const Navigation = (props) => {
    const hamburger = useRef()
    const menu = useRef()

    const logout = () => {
        window.localStorage.removeItem('userEmail')
        window.localStorage.removeItem('prevSelFlow')
        window.localStorage.removeItem('unsavedStatus')
        props.setToken("")
        window.localStorage.removeItem('AFtoken')
        props.setUser("")
        window.localStorage.removeItem('currUser')
    }

    useEffect(() => {
        function toggleMenu(){
            hamburger.current.classList.toggle("open-menu")
            menu.current.classList.toggle("reveal")
        }

        hamburger.current.addEventListener("click", toggleMenu)
        let pageBtns = Array.from(menu.current.querySelectorAll(".btn-page"))
        pageBtns.forEach(btn => btn.addEventListener("click", toggleMenu))
        const hamburgerRef = hamburger.current

        return () => {
            hamburgerRef.removeEventListener("click", toggleMenu)
            pageBtns.forEach(btn => btn.removeEventListener("click", toggleMenu))
        }
    })

    return (
        <><header>   
            <div id='loginfo'>
                <div>
                    {props.user &&
                        <>
                            <span>Logged in as</span>
                            <span id='userName'>{props.user}</span>
                        </>
                    }
                </div>
            </div> 
            <h1 id="main-title">
                <span id="full-title">Animal Flow Sequence Builder</span>
                <span id='abbr-title'>
                    <span id='letA'>A</span>
                    <span id='letF'>F</span>
                </span>             
            </h1>
            <div>              
                <img src={claws} className="claws-menu" ref={hamburger} alt=""></img>
            </div>   
        </header>
        <nav id="topnav" ref={menu}>
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
                {props.user 
                    ?   <button type="button" className="btn-page" onClick={logout}>Logout</button>
                    :   <NavLink to="/login" style={{textDecoration: "none"}}>
                            <button type="button" className="btn-page">Login</button>
                        </NavLink>
                }
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