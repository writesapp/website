import React from "react";
import { Router } from "@reach/router";

import { UserProvider } from "../../providers/UserProvider";
import Protected from "../Protected/Protected";
import Main from "../../views/Main/Main";
import Login from "../../views/Login/Login";
import Landing from '../../views/Landing/Landing';

function App() {
  return (
    <UserProvider>
      <Router>
        <Landing path="/"/>
        <Protected path="/app" view={<Main />} />
        <Login path="/login" />
      </Router>
    </UserProvider>
  );
}

export default App;
