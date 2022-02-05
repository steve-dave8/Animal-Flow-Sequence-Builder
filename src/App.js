import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Components/shared/Navigation';
import Home from './Components/pages/Home';
import MoveIndex from './Components/pages/MoveIndex';
import Login from './Components/pages/Login';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('AFtoken') || "")
  const [user, setUser] = useState(window.localStorage.getItem('currUser') || "")

  useEffect(() => {
    token && window.localStorage.setItem('AFtoken', token)
  }, [token])

  useEffect(() => {
    user && window.localStorage.setItem('currUser', user)
  }, [user])

  return (
    <BrowserRouter>
      <Navigation user={user} setUser={setUser} setToken={setToken} />
      <Switch>
        <Route exact path="/" >
          <Home token={token} />
        </Route>
        <Route exact path="/move-index" component={MoveIndex} />
        <Route exact path="/login">
          <Login setToken={setToken} setUser={setUser} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
