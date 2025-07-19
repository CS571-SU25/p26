import { useState } from 'react'
import React from 'react';
import { Button, Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [count, setCount] = useState(0)
 
  return (
        <>
        {/*use Navbar to make a header to start. Dont forget to make it reactive later.*/}
        <Navbar bg='light' className='fixed-top'>
        <Container>
            <Navbar.Brand href="#home">Home</Navbar.Brand>
        </Container>
        {/*Make a button that takes you to the login page. Remember, there are two ways to get to a page. There 
        is wrapping something in a Link tag and using useNavigate. useNavigate is for when you need to navigate
        programatically, like if you can only navigate in certain conditions like checking if a user is logged in before navigating.
        TODO should login the text be wrapped in some tag just for best practice. I cant remember */}
        <Link to={"/Login"}>
            <Button>
                Login
            </Button>
        </Link>
        </Navbar>    
        <Link to={"/Edit"}>
            <Button>
                Edit
            </Button>
        </Link>
        </>
    )
}