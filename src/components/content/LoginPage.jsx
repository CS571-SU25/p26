import { useRef, useState } from 'react'
import React from 'react';
import { Button, Navbar, Nav, Container, Form, Row, Col } from 'react-bootstrap';

export default function LoginPage() {
    //references to hold the username and password
    const username = useRef();
    const password = useRef();
    
    //TODO at some point, make this an actual login system
    if(username && password) {
        sessionStorage.setItem("loggedIn", true);
        console.log("asd");
    }

 
    return <>
        <h1>Login</h1>
        <Form>
        {/*Use Form.Group to group together the label (the description of the textbox for assistive technology like screen readers)
        and the input (where the user types). as={Row} makes this group follow Bootstrap's grid row layout.
        controlID here does two things. First, it sets the id of the Form.Control (the input) to "formUserName". 
        Second, it sets the htmlFor of the Form.Label to "formUserName", which links the label to the input.
        This connection allows screen readers to read the label’s visible text, in this case, "Username", out loud 
        when the input is focused. This links the lable and the input together for accesibility, but does not control 
        the input value.*/}
        <Form.Group as={Row} className="mb-3" controlId="formUserName">
            {/*This label is what is read by assistive technology, so make sure this is readable. Its also what appears to the left*/}
            <Form.Label column sm="2">
                Username
            </Form.Label>
            <Col sm="10">
                {/*Form.control actually renders the input type="text" under the hood. placeholder is just what ghost text you want 
                to show and can be anything.*/}
                <Form.Control type='text' 
                placeholder="Your username" 
                //Use ref to connect this input to our useRef hook.
                //Now, username.current points to the DOM element, and we can access the typed value with username.current.value.
                ref={username}
                />
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlainTextPassword">
        <Form.Label column sm="2">
          password
        </Form.Label>
        <Col sm="10">
        {/*type={"password"} is a predefined way for bootstrap to know to hide the values of what is being typed*/}
            <Form.Control type="password" 
            placeholder="Your password" 
            ref={password}
            />
        </Col>
      </Form.Group>
      </Form>
      <div className="d-flex gap-2 mb-2">
              <Button variant="primary" size="lg">
                Login
              </Button>
      </div>
    </>
}
