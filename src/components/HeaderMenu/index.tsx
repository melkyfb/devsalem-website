import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


import { NavLink } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={require('../../images/logo.png?width=32')} />{' '}
          Dev Salem
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
            <Nav.Link as={NavLink} to="/resume" >Resume</Nav.Link>
            <Nav.Link as={NavLink} to="/blog" >Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/github" >Github</Nav.Link>
            <Nav.Link as={NavLink} to="/projects" >Projects</Nav.Link>
            <Nav.Link as={NavLink} to="/socials" >Socials</Nav.Link>
            <Nav.Link as={NavLink} to="/about" >About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;