import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, Button } from 'reactstrap';

const AppNavbar = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Navbar color="info" dark expand="md" style={{ justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
      <NavbarBrand tag={ Link } to="/">Home</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{ width: "100%" }} navbar>

        </Nav>
      </Collapse>
      <Button tag={Link} to="/login">Login</Button>{'  '}
      <Button onClick={logout} style={{ marginLeft: '10px' }}>logout</Button>
    </Navbar>
  );
}

export default AppNavbar;