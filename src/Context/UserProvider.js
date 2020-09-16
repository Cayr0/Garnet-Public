import React, { useState, useContext, createContext} from 'react';

const UserContext = createContext()

export default function UserProvider({ children }) {

  const [User,setUser] = useState([])

  return(
    <UserContext.Provider
      value={{
        User,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a Context.Provider");
  const { User, setUser } = context
  return { User, setUser };
}