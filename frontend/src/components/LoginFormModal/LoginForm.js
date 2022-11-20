import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css'

function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => setShowModal(false))
            .catch(
                async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.message) {
                        const errorArr = []
                        errorArr.push(data.message)
                        setErrors(errorArr)
                    };
                }
            );
    };

    const handleDemoUser = () => {
        return dispatch(sessionActions.login(
            {
                credential: "Demo-User",
                password: "password"
            }
        ))
            .then(() => setShowModal(false))
    }

    return (
        <div className="form-container">
            <div className="form-header">Log In</div>
            <div className="form-div">

                <form className="createSpotForm" onSubmit={handleSubmit}>
                    <input
                        className="host-input"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Username or Email'
                        required
                    />
                    <input
                        className="host-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                    <ul className="errorList">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <button className="hostButton1" type="submit">Log In</button>
                </form>


                <button className="hostButton1 demoButton" onClick={() => handleDemoUser()}>Demo User</button>

            </div>

        </div >
    );
}

export default LoginForm;