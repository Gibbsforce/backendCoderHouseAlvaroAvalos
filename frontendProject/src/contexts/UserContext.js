import React, { useState, useEffect } from "react"
import { isPersistedLocal } from "../helpers"
export const UserContext = React.createContext()
// Helpers
const UserProvider = ({ children }) => {
    const [state, setState] = useState(undefined)
    useEffect(() => {
        if (isPersistedLocal("userDataLocal")) {
            setState(isPersistedLocal("userDataLocal"))
        }
    }, [])
    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider