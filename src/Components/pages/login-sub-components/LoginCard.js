import React, { useState } from 'react'

const LoginCard = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setError("")
        props.login(email, password)
    }

    return (
        <div className='user-card1'>
            <form id='login-form' className='acct-form' onSubmit={handleSubmit} >
                <div style={{display: "flex"}}>
                    <label htmlFor="userEmail">Email:</label>
                    <input required type="email" name="userEmail" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={{display: "flex"}}>
                    <label htmlFor="password">Password:</label>
                    <input required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className='stylish-submit' style={{margin: "auto", display: "block"}}>Log In</button>
                </div>
                <hr/>
                <div>
                    <p className='new-acct'>
                        Create new account{" "}
                        <i className="fas fa-arrow-circle-right" onClick={props.toggleCards}></i>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default LoginCard