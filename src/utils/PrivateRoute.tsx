import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
    let token = localStorage.getItem('token');
    return token ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;