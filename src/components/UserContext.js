import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextUpdate = createContext();

export function useUserContext () {

    const useUser = () => useContext(UserContext);
    const useUserUpdate = () => useContext(UserContextUpdate);
    const userLogout = () => useContext(UserContextUpdate);

    return { useUser, useUserUpdate, userLogout }
}

export default function UserProvider ({children}) {
    const [user, setUser] = useState({});

    function updateUser (data) {
        if(data){
            setUser(prev => ({...prev, ...data}));
        } else {
            localStorage.clear();
            sessionStorage.clear();
            setUser({})
        }
    }

    return (
        <UserContext.Provider value={user}>
            <UserContextUpdate.Provider value={updateUser}>
                {children}
            </UserContextUpdate.Provider>
        </UserContext.Provider>
    )
}