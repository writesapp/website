import React from 'react';
import { Router } from '@reach/router';

import { UserProvider } from '../../providers/UserProvider';
import Protected from '../Protected/Protected';
import Main from '../../views/Main/Main';
import Login from '../../views/Login/Login';

function App() {
  return (
    <UserProvider>
      <Router>
        <Protected path="/" view={<Main/>} />
        <Login path="/login"/>
      </Router>
    </UserProvider>
  );
}

export default App;
