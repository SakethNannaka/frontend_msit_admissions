import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as reac from 'react-bootstrap';
import logo from './logo.png'

export default class Navbar extends Component {
    render() {
        return (
          <div>
            <reac.Navbar collapseOnSelect style={{padding:'10px',backgroundColor:'#00284d'}} fixed = "top" variant="dark">
            <reac.Navbar.Brand>
                <img
                  alt=""
                  src={logo}
                  height={30}
                  className="d-inline-block align-top"
                />{' '}
            </reac.Navbar.Brand>
            <reac.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <reac.Navbar.Collapse id="responsive-navbar-nav">
              <reac.Nav className="mr-auto">
              </reac.Nav>
              <reac.Nav style = {{}}>
              <reac.NavItem><Link className="nav-link" to={"/login"}>Login</Link></reac.NavItem>
              <reac.NavItem><Link className="nav-link" to={"/register"}>Register</Link></reac.NavItem>
              <reac.NavItem><Link className="nav-link" to={"/process"}>Home</Link></reac.NavItem>
                {/* <reac.Nav.Link href="/login">SIGNIN</reac.Nav.Link>
                <reac.Nav.Link href="/register">SIGNUP</reac.Nav.Link> */}
              </reac.Nav>
            </reac.Navbar.Collapse>
          </reac.Navbar>
          </div> 
        );
    }
}