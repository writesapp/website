import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseInit';

export const UserContext = React.createContext({ user: null });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user))
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}
