import Footer from "../component/Footer";

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Simple Site</h1>
            <h3>Your go-to platform for seamless user experiance and simple navigation. Explore our features and connect with us through our easy-to-use interface.</h3>
        </div>
    );
};

export default Home;

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
    title: {
        color: 'black',
        fontSize: '2rem',
        marginBottom: '1rem',
    },
};