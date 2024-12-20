import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }

        if (user?.role !== "admin") {
            return navigate("/admin");
        };
    }, []);
    return children;
}

export default AdminRoute