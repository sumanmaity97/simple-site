import React, { useEffect, useRef, useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/helpers";
import { API } from "../utils/api";
import { useUser } from "../context/UserContext";
import { IUser } from "../../types";

function EditProfile() {
    const navigate = useNavigate();

    const { user, updateUser, clearUser } = useUser();

    const emailRef = useRef<any>(null);
    const hasFetchedRef = useRef(false);

    const [name, setName] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [dob, setDob] = useState<string | undefined>('');
    const [image, setImage] = useState<string | undefined>('');

    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            getProfileData();
        }
    }, []);

    const getProfileData = async () => {
        try {
            console.log(user);
            const response: any = await API.get(`auth/profile/${user?._id}`);
            console.log("PPPP: ", response);
            let tempUser: IUser = { ...user } as IUser;
            tempUser.profileData = response.profileData;
            setName(response?.profileData?.name);
            setEmail(user?.email);
            setDob(response?.profileData?.dob);
            setImage(response?.profileData?.profilePic);
        } catch (error) {

        }
    }

    const handleLogout = async () => {
        localStorage.setItem('userData', '');
        localStorage.setItem('token', '');
        window.dispatchEvent(new Event("storage"));
        showToast('Successfully logged out!', "success");
        navigate("/login");
    }

    const handleSubmit = async () => {
        if (name) {
            let inputs = {
                userId: user?._id,
                profileData: {
                    name,
                    dob,
                    profilePic: image
                }
            }
            console.log("INPUTS: ", inputs);

            try {
                const response: any = await API.post('auth/profile/create', inputs);
                console.log("REG RES: ", response);
                showToast('Successfully update profile!', "success");
                let data: IUser = { ...user } as IUser;
                data.profileData = response?.data?.profileData
                localStorage.setItem('userData', JSON.stringify(data));
                updateUser(data);
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
                <img
                    src={user?.profileData?.profilePic || '/images/profile.jpg'}
                    onError={(e) => {
                        e.currentTarget.src = '/images/profile.jpg';
                    }}
                    style={{ height: 200, width: 200 }}
                    alt="Profile"
                />
            </div>
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

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="date"
                        value={dob}
                        className="input"
                        onChange={(e) => setDob(e.target.value)}
                        max={new Date().toISOString().split("T")[0]} // Optional: Prevent future dates
                    />
                </div>

                <div className="mar-top">
                    <button onClick={handleSubmit} className="update-button">
                        Update
                    </button>
                </div>

            </div>
            {/* <button
                onClick={handleLogout}
                className="submit-button"
            >
                Logout
            </button> */}
        </div>
    )
}

export default EditProfile;

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