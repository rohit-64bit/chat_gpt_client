import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuth(true)
        }
    }, [localStorage.getItem("token")])

    return (
        <AuthContext.Provider value={{
            isAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };