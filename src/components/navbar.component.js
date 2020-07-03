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
                  height={40}
                  className="d-inline-block align-top"
                />{' '}
            </reac.Navbar.Brand>
            <reac.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <reac.Navbar.Collapse id="responsive-navbar-nav">
              <reac.Nav className="mr-auto">
              </reac.Nav>
              <reac.Nav style = {{}}>
              <reac.NavItem><Link className="nav-link" to={"/login"}>Signin</Link></reac.NavItem>
              <reac.NavItem><Link className="nav-link" to={"/register"}>Signup</Link></reac.NavItem>
                {/* <reac.Nav.Link href="/login">SIGNIN</reac.Nav.Link>
                <reac.Nav.Link href="/register">SIGNUP</reac.Nav.Link> */}
              </reac.Nav>
            </reac.Navbar.Collapse>
          </reac.Navbar>
          </div> 
        );
    }
}

// export default class Navbar extends Component {

//     render() {
//         return (
//             <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//                 <div className="container">
//                 <img src = "https://msitprogram.net/admissions/logo.gif" alt = "MSIT Logo" height = "50"></img>
//                 <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//                     <ul className="navbar-nav ml-auto">
//                     <li className="nav-item">
//                         <Link className="nav-link" to={"/Login"}>Login</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to={"/Register"}>Register</Link>
//                     </li>
//                     </ul>
//                 </div>
//                 </div>
//             </nav>

//         );
//     }
// }