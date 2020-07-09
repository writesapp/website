import React, { useEffect, useContext } from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "../../providers/UserProvider";

export default function Landing() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const searchParams =  new URLSearchParams(window.location.search)
    if (user && searchParams.get("redirect") !== "false") {
      navigate('/app', { replace: true });
    }
  });

  return (
    <div>
      <h1>hello user</h1>
      <Link to="/app">App</Link>
    </div>
  );
};