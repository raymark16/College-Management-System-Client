import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
function PrivateRoutes() {
    const { auth } = useAuth();

    if (auth === undefined) return <Loading />;

    return auth === true ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoutes;