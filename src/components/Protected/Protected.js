import React, { useEffect, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { navigate } from "@reach/router";

export default function Protected({ view: View, ...props }) {
  if (!View) throw new Error("No view has been passed");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  });

  return user ? <View {...props} /> : null;
}
