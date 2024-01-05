import React, { ReactNode, createContext, useState } from "react"

export interface User {
    id: number
    name: string
    username: string
    email: string
}

interface Context {
    user?: User
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
}

interface Props {
    children: ReactNode
}

const defaultValue: Context = {
    user: undefined,
    setUser: undefined
}

export const AppContext = createContext(defaultValue)

const ContextProvider = ({children}: Props) => {
    const [user, setUser] = useState<User>()

    return (
        <AppContext.Provider value={{ user, setUser: setUser}}>
            {children}
        </AppContext.Provider>
    )
}
export default ContextProvider