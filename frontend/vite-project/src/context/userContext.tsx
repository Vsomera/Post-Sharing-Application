import { FC, ReactNode, createContext, useEffect, useState } from "react"
import { User } from "../interfaces/User"

interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void;
}

interface Props {
    children: ReactNode
    initial?: null
}

export const UserContext = createContext<UserContextType>({
    setUser: () => {}, // dummy function to satisfy the setUser type
    user: null  // if no user is logged in => null
})

export const UserContextProvider: FC<Props> = ({ children, initial = null }) => {
    const [user, setUser] = useState<User | null>(initial)

    // Load user data from local storage when the component mounts
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
    }, [])

    // save user data to local storage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            // remove the user data from local storage (when user logs out)
            localStorage.removeItem("user");
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}