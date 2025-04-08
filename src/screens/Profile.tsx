import React, { useEffect, useRef, useState } from "react";
import '../styles/Profile.css';
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/helpers";
import { API, setAuthToken } from "../utils/api";
import { useUser } from "../context/UserContext";
import { IUser } from "../../types";

function Profile() {
    const navigate = useNavigate();

    const { user, clearUser } = useUser();

    const hasFetchedRef = useRef(false);

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
        } catch (error) {

        }
    }

    const handleLogout = async () => {
        localStorage.setItem('userData', '');
        localStorage.setItem('token', '');
        setAuthToken('');
        clearUser();
        window.dispatchEvent(new Event("storage"));
        showToast('Successfully logged out!', "success");
        navigate("/login");
    }

    return (
        <div style={styles.container}>
            <div style={styles.cardView}>
                <div style={styles.nameImageWrap}>
                    <div style={styles.image}>
                        <img
                            src={user?.profileData?.profilePic || '/images/profile.jpg'}
                            onError={(e) => {
                                e.currentTarget.src = '/images/profile.jpg';
                            }}
                            style={{ height: 130, width: 130 }}
                            alt="Profile"
                        />
                    </div>
                    <div style={styles.nameWrap}>
                        <p style={styles.name}>{user?.profileData?.name || "NA"}</p>
                        <p style={styles.email}>{user?.email}</p>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px'
                }}>
                    <button
                        onClick={() => navigate('/editProfile')}
                        className="edit-button"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="edit-button"
                    >
                        Logout
                    </button>
                </div>
            </div>
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
    cardView: {
        width: '600px',
        padding: '20px 50px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        margin: '20px auto',
        textAlign: 'center' as const,
    },
    nameImageWrap: {
        display: 'flex',
        flexDirection: 'row' as const, // 👈 This puts children in a row
        alignItems: 'center' as const, // 👈 Vertically center image + text
        gap: '20px',
    },
    nameWrap: {
        display: 'flex',
        flexDirection: 'column' as const,
        // textAlign: 'left' as const,
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1px solid #ccc',
        marginBottom: '20px'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'left' as const
    },
    email: {
        fontSize: 18,
        color: '#666',
        margin: 0,
        textAlign: 'left' as const
    }
};