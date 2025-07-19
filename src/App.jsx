import { useState } from 'react'
import React from 'react';
import './App.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/content/HomePage';
import EditingPage from './components/content/EditingPage';
import TestPage from './components/content/TestPage';
import LoginPage from './components/content/LoginPage';


function App() {
  const [count, setCount] = useState(0)

  //app.jsx should be used for routing and maybe fetching.
  return (
    //for now, we are going to use hashrouter, because being able to use github pages could be nice
    <HashRouter>
      {/*So will have multiple routes later, specify routes */}
      <Routes>
        {/*Make the homepage the homepage by setting the default (aka website.come) the homepage. Remember that element expects something
        inside of a tag, so we put </> around the name of our homepage component. */}
        <Route path="/" element={<HomePage/>}></Route>
        {/*Add the other paths */}
        <Route path="/Edit" element={<EditingPage/>}></Route>
        <Route path="/Test" element={<TestPage/>}></Route>
        <Route path="/Login" element={<LoginPage/>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
