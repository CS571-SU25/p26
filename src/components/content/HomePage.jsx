import { useState } from 'react'
import React from 'react';
import { Button, Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [isEditor, setIsEditor] = useState();
 
  return (
        <Form>
           <Link to={"/Edit"} >
              <Button isEditor={true}>
                  Write
              </Button>
            </Link>
            <Link to={"/Test"} >
              <Button >
                  Read
              </Button>
            </Link>
        </Form>
    )
}
