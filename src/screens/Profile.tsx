import React, { useEffect, useRef, useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/helpers";
import { API } from "../utils/api";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    const emailRef = useRef<any>(null);
    const passRef = useRef<any>(null);
    const rePassRef = useRef<any>(null);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        let data: any = null;
        if(localStorage.getItem('userData')){
            //@ts-ignore
            data = JSON.parse(localStorage.getItem('userData'));
        }
        console.log("user:", data);
        if (data) {
            console.log("INSIDE: ", data?.profileData?.name);
        
            setName(data?.profileData?.name);
            setEmail(data?.email);
            setDob(data?.profileData?.dob);
            setImage(data?.profileData?.profilePic);
        }
        setUser(data);
    }, [])

    const handleLogout = async () => {
        localStorage.setItem('userData', '');
        localStorage.setItem('token', '');
        window.dispatchEvent(new Event("storage"));
        showToast('Successfully logged out!', "success");
        navigate("/login");
    }

    const handleSubmit = async () => {
        if ( name ) {
            let inputs = {
                userId: user?._id,
                profileData: {
                    name,
                    dob,
                    profilePic: image
                }
            }
            console.log(inputs);
            
            let headers: any = {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            try {
                const response: any = await API.post('auth/profile/create', inputs, {headers});
                console.log("REG RES: ", response);
                showToast('Successfully update profile!', "success");
                let data: any = {...user};
                data.profileData = response?.data?.profileData
                localStorage.setItem('userData', JSON.stringify(data));
                setNameError('');
            } catch (error: any) {
                // showToast("Something went wrong!", "error");
                if (error?.response?.data?.msg) {
                    showToast(error.response.data.msg, "error");
                }
            }
        } else {
            if (!name) {
                setNameError('Enter name');
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.image}>
                <img src={user?.profileData?.profilePic} style={{ height: 200, width: 200, }} />
            </div>
            {/* <h2 style={styles.name}>{user?.profileData?.name}</h2>
            <h4 style={styles.name}>{user?.profileData?.dob}</h4> */}
            <div className="login-card" >
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (e.target.value) {
                                setNameError('');
                            }
                            else {
                                setNameError("Enter name");
                            }
                        }}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                emailRef?.current?.focus();
                            }
                        }}
                    />
                    {nameError && <p className="error">{nameError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className="input"
                        readOnly
                    />
                </div>

                <div className="mar-top">
                    <button onClick={handleSubmit} className="update-button">
                        Update
                    </button>
                </div>

            </div>
            <button
                onClick={handleLogout}
                className="submit-button"
            >
                Logout
            </button>
        </div>
    )
}

export default Profile;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,       // stack vertically ✅
        justifyContent: 'center' as const,      // center vertically
        alignItems: 'center' as const,          // center horizontally
        height: '90vh',
        backgroundColor: '#f9f9f9',
        textAlign: 'center' as const,           // optional: center the text
    },
    name: {
        color: 'black',
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1px solid #ccc',
        marginBottom: '20px'
    }
};