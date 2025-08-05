import { useState } from 'react'
import React from 'react';
import './App.css'
import { Button, Navbar, Nav, Container, Form } from 'react-bootstrap';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/content/HomePage';
import EditingPage from './components/content/EditingPage';
import TestPage from './components/content/TestPage';
import LoginPage from './components/content/LoginPage';
import { Link } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  //app.jsx should be used for routing and maybe fetching.
  return (
    //for now, we are going to use hashrouter, because being able to use github pages could be nice
    <HashRouter>
      {/*use Navbar to make a header to start. Dont forget to make it reactive later. We wrap our router and its pages with our navbar, 
      so it appears on all pages*/}
      <Navbar bg='light' className='fixed-top d-flex '>
          {/*We wrap everything in a container. d-flex makes everything inside flex items. justify content between and 
          align items center make it so the buttons are at the ends, but not stuck to the wall */}
          <Container className="d-flex justify-content-between align-items-center">
              {/*Use `as` and `to` replicate using <Link/> */}
              <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
              {/*We are using Link because we dont need to navigate programattically. The other option, useNavigate is for when you need to navigate
              programatically, like if you can only navigate in certain conditions like checking if a user is logged in before navigating.
              Make a div to wrap the two buttons on the right so that they have a gap between them. Even though they are already
              flex items, we add d flex so that gap 2 actually seperates these two buttons (The `gap-*` utility only works on elements that 
              are flex or grid containers themselves.)  */}
              <div className="d-flex">
                  <Link to={"/Login"}>
                      <Button>
                          Login
                      </Button>
                  </Link>    
              </div>
          </Container>
      </Navbar>
      {/*So will have multiple routes later, specify routes. 
      Add padding between the navbar and whatever loaded page we are on ensure there is no top cropping issues */}
      <div style={{ paddingTop: "4rem" }}>
        <Routes>
          {/*Make the homepage the homepage by setting the default (aka website.come) the homepage. Remember that element expects something
          inside of a tag, so we put </> around the name of our homepage component. */}
          <Route path="/" element={<HomePage/>}></Route>
          {/*Add the other paths */}
          <Route path="/Edit" element={<EditingPage/>}></Route>
          <Route path="/Test" element={<TestPage/>}></Route>
          <Route path="/Login" element={<LoginPage/>}></Route>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
