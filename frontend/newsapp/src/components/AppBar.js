import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppBar.css';

function AppBar() {
    return (
        <div>
            
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" >
                    <img
                        src="https://images.ctfassets.net/iu0mu3vn5llb/1HMwryt8JemgsgOWuYuQmq/2f3131c800d78b3b4ae8532219b139d2/globus.png"
                        className="brandimg"
                        alt="The Column"
                    />
                    <h1 className="brandname">
                        The Column
                    </h1>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto stroke text-center">
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
