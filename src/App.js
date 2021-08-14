import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Navigation from './Components/Navigation';
import Home from './Components/Home';

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
