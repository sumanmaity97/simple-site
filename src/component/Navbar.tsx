import { Link } from "react-router-dom";
import { Language } from '@mui/icons-material';
import { useEffect, useState } from "react";

const Navbar = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        // Listen to storage changes (in case token is updated in another tab)
        window.addEventListener("storage", handleStorageChange);

        // Optional: poll or check periodically, or trigger manually on login/logout
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <nav style={styles.navbar}>
            <div style={styles.leftWrap}>
                <Language style={{ color: 'white' }} />
                <h3 style={styles.title}>Simple Site</h3>
            </div>
            <div style={styles.linkWrap}>
                <Link to="/home" style={styles.link}>Home</Link>
                {token ? (
                    <>
                        <Link to="/profile" style={styles.link}>Profile</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.link}>Register</Link>
                        <Link to="/profile" style={styles.link}>Profile</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        padding: "0 10px",
        textAlign: "center" as const,
        display: "flex",
        justifyContent: "space-between" as const,
        alignItems: "center" as const,
        zIndex: 1000,
        // flexDirection: 'row'
    },
    linkWrap: {
        gap: "20px",
        padding: "0 10px",
    },
    leftWrap: {
        gap: "20px",
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: "center" as const,
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "10px",
    },
    title: {
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "16px",
        borderRadius: "5px",
    },
};

export default Navbar;
