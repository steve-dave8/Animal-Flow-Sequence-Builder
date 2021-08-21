import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Components/shared/Navigation';
import Home from './Components/pages/Home';
import MoveIndex from './Components/pages/MoveIndex';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/move-index" component={MoveIndex} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
