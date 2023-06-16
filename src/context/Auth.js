import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { URLi } from '../App';
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(undefined);
    const [userInfo, setUserInfo] = useState({})

    const verifyAuth = async () => {
        const res = await axios.get(`${URLi}/auth/is_logged_in`);
        console.log(res.data)
        setUserInfo(res.data.userInfo)
        setAuth(res.data.loggedIn);
        return res.data.loggedIn;
    };

    useEffect(() => {
        verifyAuth()

    }, [])

    return (
        <AuthContext.Provider value={{ auth, verifyAuth, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;