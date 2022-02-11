import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Components/shared/Navigation';
import Home from './Components/pages/Home';
import MoveIndex from './Components/pages/MoveIndex';
import Login from './Components/pages/Login';
import Loading from './Components/shared/Loading';

const getMoveList = async () => {
  console.log(process.env.BACKEND_URL)
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/move-list`, {method: "GET", mode: 'cors'});
  const data = await response.json();
  console.log({response, data})
  return data;
};

function App() {
  const [moveList, setMoveList] = useState([])

  const [token, setToken] = useState(window.localStorage.getItem('AFtoken') || "")
  const [user, setUser] = useState(window.localStorage.getItem('currUser') || "")

  useEffect(() => {
    getMoveList().then(data => setMoveList(data))
  }, [])

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
          {(moveList.length > 0) 
            ? <Home token={token} moveList={moveList} />
            : <Loading type={'spokes'} color={'#a00303'} containerClass={'loading'} />
          }        
        </Route>
        <Route exact path="/move-index" >
          {(moveList.length > 0) 
            ? <MoveIndex moveList={moveList} />
            : <Loading type={'spokes'} color={'#a00303'} containerClass={'loading'} />
          }
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} setUser={setUser} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
