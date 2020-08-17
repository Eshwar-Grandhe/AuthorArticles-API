import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppBar.css';

function AppBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="http://smartlabtech.com/wp-content/uploads/2019/09/smartlabtech-logo.png"
                        className="align-top brandimg"
                        alt="SmartLabTech"
                    />  
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto stroke">
                        <Nav.Link as={Link} to="/">Add Authors</Nav.Link>
                        <Nav.Link as={Link} to="/news">Articles</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppBar
