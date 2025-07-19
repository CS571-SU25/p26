import { useRef, useState } from 'react'
import React from 'react';
import { Button, Navbar, Nav, Container, Form } from 'react-bootstrap';

export default function EditingPage() {
    //use a useRef for the user text because they are going to be typing a lot of stuff. TODO, make sure this is only 
    //filled after a button is clicked, not just when any character is typed
    const usersText = useRef();

    return (
    <Form>
        <Form.Group>
            <Form.Label>Words here</Form.Label>
            <Form.Control
            placeholder="Go nuts!"
            ref={usersText}/>
        </Form.Group>
    </Form>
    )
}