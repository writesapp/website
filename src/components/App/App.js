import React from "react";
import { Router } from "@reach/router";

import { UserProvider } from "../../providers/UserProvider";
import Protected from "../Protected/Protected";
import Main from "../../views/Main/Main";
import Login from "../../views/Login/Login";
import Landing from "../../views/Landing/Landing";
import Write from "../../views/Write/Write";
import Add from "../../views/Add/Add";
import Profile from "../../views/Profile/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Landing path="/" />
        <Protected path="/app" view={Main} />
        <Protected path="/app/add" view={Add} />
        <Protected path="/app/write/:writeId" view={Write} />
        <Protected path="/app/profile" view={Profile} />
        <Login path="/login" />
      </Router>
    </UserProvider>
  );
}

export default App;
