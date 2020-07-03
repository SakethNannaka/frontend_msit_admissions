import React, { Component } from 'react';
import * as reac from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from './logo.png'
import AuthApi from "../utils/AuthApi"


export default function Navbar() {

  const authApi = React.useContext(AuthApi)
  const handleLogout = async () => {
      // console.log(res.data.auth);
  localStorage.removeItem('auth')
  localStorage.removeItem('email')
  localStorage.removeItem('userOBJ')
  localStorage.removeItem('state')
  authApi.setAuth(false)
  }
  

      
        return (
            // <reac.Navbar collapseOnSelect expand="lg" bg="success" variant="light" fixed = "top">
            <reac.Navbar collapseOnSelect style={{padding:'10px',backgroundColor:'#00284d'}} fixed = "top" variant="dark">
            <reac.Navbar.Brand>
                <img
                  alt=""
                  src={logo}
                  height={40}
                  className="d-inline-block align-top"
                />{' '}
            </reac.Navbar.Brand>
            <reac.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <reac.Navbar.Collapse id="responsive-navbar-nav">
              <reac.Nav className="mr-auto">
              </reac.Nav>
              <reac.Nav>
              <reac.NavDropdown title="Account" id="collasible-nav-dropdown">
                  <reac.NavDropdown.Item><Link to={"/changepassword"}>Change Password</Link></reac.NavDropdown.Item>
                  {/* <reac.NavDropdown.Item><Link to = {"/logout"}>Logout</Link></reac.NavDropdown.Item> */}
                </reac.NavDropdown>
                <reac.NavItem ><reac.Button variant="success" type="submit" onClick = {handleLogout}>
                  Logout
                </reac.Button></reac.NavItem>
              </reac.Nav>
            </reac.Navbar.Collapse>
          </reac.Navbar>
        );
    }
