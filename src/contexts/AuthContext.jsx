import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)

    console.log(isAuth)

    useEffect(() => {

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (token) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }

    }, [typeof window !== "undefined" && localStorage.getItem("token"), isAuth])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };