import React from "react";
import { Router } from "@reach/router";

import { UserProvider } from "../../providers/UserProvider";
import Protected from "../Protected/Protected";
import Main from "../../views/Main/Main";
import Login from "../../views/Login/Login";
import Landing from '../../views/Landing/Landing';
import Write from '../../views/Write/Write';

function App() {
  return (
    <UserProvider>
      <Router>
        <Landing path="/"/>
        <Protected path="/app" view={<Main />} />
        <Login path="/login" />
        <Write path="/write/:writeId" />
      </Router>
    </UserProvider>
  );
}

export default App;
