const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>© {new Date().getFullYear()} Simple Site. All rights reserved.</p>
                <div style={styles.links}>
                    <a href="/about" style={styles.link}>About</a>
                    <a href="/contact" style={styles.link}>Contact</a>
                    <a href="/privacy" style={styles.link}>Privacy</a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#444',
        color: '#fff',
        padding: '20px 0',
        position: 'fixed' as 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        gap: '10px',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
    links: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap' as 'wrap',
    },
    link: {
        color: '#bbb',
        textDecoration: 'none',
        fontSize: '14px',
    },
};

export default Footer;