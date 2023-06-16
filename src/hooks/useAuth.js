import { useContext } from "react";
import AuthContext from "../context/Auth";

const useAuth = () => {
    const { auth, verifyAuth, userInfo } = useContext(AuthContext);
    return { auth, verifyAuth, userInfo };
}

export default useAuth;