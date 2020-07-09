import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";

export const UserContext = React.createContext({ user: null });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        const usersRef = db.collection("users");
        usersRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              usersRef.doc(user.uid).set({
                mod: false,
                credits: 10,
              });
            }
          });
      }
    });
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}
