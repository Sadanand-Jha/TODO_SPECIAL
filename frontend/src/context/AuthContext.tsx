'use client'
import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";

interface AuthContextType{
    AuthUser: IUser | undefined,
    setAuthUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    login: (user: IUser) => void,
    logout: () => void
}

export interface IUser{
    email: string,
    username: string
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("AuthContext is undefined. Did you forget to wrap your app with <AuthContextProvider>?")
    }
    return context;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const [AuthUser, setAuthUser] = useState<undefined | IUser>(undefined)
    
    const login = useCallback((user1: IUser) => {
        setAuthUser(prev => user1)
        console.log(user1)
        console.log("user updated on the context")
        console.log("this is from the context, the user is ", AuthUser)
    }, [])

    const logout = useCallback(() => {
        setAuthUser(undefined)
        console.log("User removed from context")
    }, [])

    const value: AuthContextType = {
        AuthUser,
        setAuthUser,
        login,
        logout
    }
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export default AuthContext