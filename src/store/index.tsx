"use client"
import { auth } from "@/services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StoreType = {
    user: User | null | "None",
}
const GlobalContext = createContext<StoreType>({ user: null })
const GlobalContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null | "None">(null)
    const handleAuthorize = async (user: User | null) => {
        if (user) {
            setUser(user)
        } else {
            setUser("None")
        }
    }
    useEffect(() => {
        // const user = auth.currentUser;
        // handleAuthorize(user)
        onAuthStateChanged(auth, handleAuthorize);
    }, [])
    return (
        <GlobalContext.Provider value={{ user }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider
export const useUser = () => ({
    user: useContext(GlobalContext).user
})