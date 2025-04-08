import React, { useState } from "react";
import { Avatar, Card, CardContent, Typography, Button, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({profile}: {profile: any}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.setItem('userData', '');
        localStorage.setItem('token', '');
        navigate("/login");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "profile-popover" : undefined;

    return (
        <div style={{ position: "absolute", top: 20, right: 20 }}>
            {/* Profile Button */}
            <Button onClick={handleClick} style={{ display: "flex", alignItems: "center", gap: 10, outline: "none", border: "none"  }}>
                <Avatar src={profile.image} alt="Profile" />
                <Typography variant="body1" style={{color: '#f53131'}}>{profile.name}</Typography>
            </Button>

            {/* Profile Card (Popover) */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Card sx={{ width: 250, padding: 2 }}>
                    <Avatar src={profile.image} alt="Profile" sx={{ width: 80, height: 80, margin: "auto" }} />
                    <CardContent>
                        <Typography variant="h6" align="center">{profile.name}</Typography>
                        <Typography variant="body2" color="textSecondary" align="center">{profile.email}</Typography>
                        {/* <Typography variant="body2" color="textSecondary" align="center">{profile.phone}</Typography> */}
                    </CardContent>
                    <Button fullWidth onClick={handleLogout} sx={{ mt: 1 }} style={{color: '#f53131'}}>Logout</Button>
                </Card>
            </Popover>
        </div>
    );
};

export default ProfileHeader;
