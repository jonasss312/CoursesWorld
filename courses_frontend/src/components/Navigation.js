import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../components/AuthenticationSlice'

const Navigation = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice)
    const dispatch = useDispatch()

    return (
        <header>
            <Navbar bg="dark" expand="lg" class="navbar-dark">
                <Container>
                <Navbar.Brand style={{color:"white"}}> Courses.World</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }} to="/">
                                Home
                            </NavLink>
                            <NavLink style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }} to="/Categories">
                                Categories
                            </NavLink>
                            <NavLink style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }} to="/About">
                                About
                            </NavLink>
                        </Nav>
                        <Nav>
                            {isLoggedIn ?
                                <Button variant='link' href='/signin' style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }} onClick={() => dispatch(logout())}>Log out</Button> :
                                <>
                                    <NavLink to='signup' style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }}>Sign up</NavLink>
                                    <NavLink to='signin' style={{ marginLeft: '1rem', color:"white", textDecoration:'none' }}>Sign In</NavLink>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Navigation