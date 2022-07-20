import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default class HeaderNav extends Component {
    render() {
        return (
            <>
                <Navbar className='shadow' bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">My QNA</Navbar.Brand>
                        <Nav className="me-auto">
                            <NavLink className='text-light text-decoration-none' to='/'>Home</NavLink>
                        </Nav>
                    </Container>
                </Navbar>

            </>
        )
    }
}
