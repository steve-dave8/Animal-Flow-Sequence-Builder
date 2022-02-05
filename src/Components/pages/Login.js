import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoginCard from './login-sub-components/LoginCard'
import RegisterCard from './login-sub-components/RegisterCard'

const Login = (props) => {
    let history = useHistory()
    const [error, setError] = useState("")

    const slider = useRef()

    let lastpassEmail, lastpassPW
    let lastpassCheck = false

    const toggleCards = () => {
        const card1 = slider.current.querySelector(".user-card1")
        const card2 = slider.current.querySelector(".user-card2")
        card1.classList.toggle("card1-hidden")
        card2.classList.toggle("card2-hidden")
        setError("")

        //Edgecase - icons from LastPass extension would remain visible otherwise:
        if (!lastpassCheck) {
            lastpassEmail = document.getElementById('__lpform_userEmail_icon')
            lastpassPW = document.getElementById('__lpform_password_icon')
            lastpassCheck = true
        }
        if (lastpassEmail) {
            if (lastpassEmail.classList.contains('hidden')) {
                setTimeout(() => lastpassEmail.classList.remove('hidden'), 800)
            } else {
                lastpassEmail.classList.add('hidden')
            }
        }
        if (lastpassPW) {
            if (lastpassPW.classList.contains('hidden')) {
                setTimeout(() => lastpassPW.classList.remove('hidden'), 800)
            } else {
                lastpassPW.classList.add('hidden')
            }
        }
    }

    const login = async (emailState, passwordState) => {
        const response = await fetch('http://localhost:4000/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: emailState, password: passwordState})
        })
        const payload = await response.json()
        if (response.status === 401) {
            setError(payload)
        }
        if (response.status === 200) {
            window.localStorage.setItem('userEmail', emailState)
            props.setToken(payload.token)
            props.setUser(payload.userName)
            history.push("/")
        }
    }

    return (
        <main id="login-page">
            <div ref={slider}>
                <LoginCard toggleCards={toggleCards} setError={setError} login={login} />
                <RegisterCard toggleCards={toggleCards} setError={setError} login={login} />
            </div>
            <div className={`error alert ${error ? "reveal" : ""}`}>{error}</div>
        </main>
    )
}

export default Login