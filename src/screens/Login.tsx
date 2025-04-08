import React, { useRef, useState } from "react";
import '../styles/Login.css';
import { showToast } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../utils/api";
import { useUser } from "../context/UserContext";

function Login() {

    const { updateUser, clearUser } = useUser();

    const passRef = useRef<any>(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');

    const validateEmail = (e: any) => {
        const value = e.target.value;
        setEmail(value);

        // Simple email validation regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async () => {
        if (!emailError && email && password) {
            let inputs = {
                email,
                password
            }

            try {
                const response: any = await API.post('auth/login', inputs);
                console.log("LOGIN RES: ", response);
                if (response?.isAuthenticated) {
                    setPassError('');
                    setEmailError('');
                    localStorage.setItem('userData', JSON.stringify(response?.user));
                    updateUser(response.user);
                    localStorage.setItem('token', response?.token);
                    setAuthToken(response?.token);
                    window.dispatchEvent(new Event("storage"));
                    showToast('Successfully logged in!', "success");
                    navigate("/home");
                }

            } catch (error: any) {
                console.log(error);
                if (error?.response?.data?.msg) {
                    showToast(error.response.data.msg, "error");
                }
                clearUser();
            }
        } else {
            if (!password) {
                setPassError("Enter password");
            }
            if (!email && !emailError) {
                setEmailError("Enter email")
            }
        }
    };

    return (
        <div className="fullscreen-background">
            <div className="login-card" >
                <h3>Login to Your Account</h3>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={validateEmail}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                if (!emailPattern.test(email)) {
                                    setEmailError('Invalid email address');
                                } else {
                                    setEmailError('');
                                    passRef?.current?.focus();
                                }
                            }
                        }}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px', }}>
                    <input
                        ref={passRef}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value) {
                                setPassError('');
                            }
                            else {
                                setPassError("Enter password");
                            }
                        }}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                    {passError && <p className="error">{passError}</p>}
                </div>

                <div className="mar-top">
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                </div>

                <div className="mar-top">
                    <a className="dont-text" onClick={() => navigate("/signup")}>Don't have an account? Create</a>
                </div>
            </div>
        </div>
    )
}

export default Login
