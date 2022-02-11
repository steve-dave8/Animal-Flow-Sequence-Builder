import React, { useState } from 'react'
import Swal from 'sweetalert2'

const RegisterCard = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        props.setError("")
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const payload = await response.json()
        if (response.status === 400) {
            props.setError(payload)
        }
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                text: `User account created for ${name}. You will be logged in and redirected to the home page.`
            }).then(() => props.login(email, password))
        }
    }

    return (
        <div className='user-card2 card2-hidden'>
            <form id='register-form' className='acct-form' onSubmit={handleSubmit}>
                <div style={{display: "flex"}}>
                    <label htmlFor='name'>Name:</label>
                    <input required type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div style={{display: "flex"}}>
                    <label htmlFor="userEmail">Email:</label>
                    <input required type="email" name="userEmail" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={{display: "flex"}}>
                    <label htmlFor="password">Password:</label>
                    <input required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className='stylish-submit' style={{margin: "auto", display: "block"}}>Create Account</button>
                </div>
                <hr/>
                <div>
                    <p className='new-acct'>
                        <i className="fas fa-arrow-circle-left" onClick={props.toggleCards}></i>
                        {" "}Login
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterCard