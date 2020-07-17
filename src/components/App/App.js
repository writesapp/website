import React from "react";
import { Router } from "@reach/router";

import { UserProvider } from "../../providers/UserProvider";
import Protected from "../Protected/Protected";
import Main from "../../views/Main/Main";
import Login from "../../views/Login/Login";
import Landing from "../../views/Landing/Landing";
import Write from "../../views/Write/Write";
import Add from "../../views/Add/Add";

function App() {
  return (
    <UserProvider>
      <Router>
        <Landing path="/" />
        <Protected path="/app" view={Main} />
        <Protected path="/add" view={Add} />
        <Protected path="/write/:writeId" view={Write} />
        <Login path="/login" />
      </Router>
    </UserProvider>
  );
}

export default App;
