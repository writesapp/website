import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { auth, db } from "../firebase";
import { useMountEffect } from "../hooks/useMountEffect";

import "../assets/styles/fadeIn.css";

export const UserContext = React.createContext({ user: null });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useMountEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

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
  });

  return (
    <UserContext.Provider value={{ user }}>
      <CSSTransitionGroup
        transitionName="fadeIn"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={0}
      >
        {!loading && children}
      </CSSTransitionGroup>
    </UserContext.Provider>
  );
}
