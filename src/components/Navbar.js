import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
//import './Navbar.css';


import { withRouter } from "react-router";
const logout = () => {

   localStorage.removeItem("token");
   localStorage.removeItem("log");
   window.location="/";
   
 };

const NavbarAd = props => {
   

  return (
      <>
 
  <Navbar  className="nav"expand="lg" width="100%">
  <Navbar.Brand className="navbar-item " style={{color:'#fff'}}href="/">eKMIT</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
   
    </Nav>
    <NavDropdown title={localStorage.getItem('log')} id="nav-dropdown">
        <NavDropdown.Item className="logout" style={{/*background:'#1f2635',*/color:'#1f2635'}} onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    {/* <Dropdown>
    {/* <Dropdown.Toggle className=" sidebar-item" variant="primary"  width="2px">
    Signed in as : {localStorage.getItem('log')}
  </Dropdown.Toggle> 

  <Dropdown.Menu >
    <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
   
  </Dropdown.Menu>
  </Dropdown> */}
    
  </Navbar.Collapse>
</Navbar>

      </>
      );
};
const NavbarHome = withRouter(NavbarAd);
export default NavbarHome

