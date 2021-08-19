import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css' 

import Navigation from './Components/shared/Navigation';
import Home from './Components/pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation/>
      </BrowserRouter>
      <Home/>
    </>
  );
}

export default App;
