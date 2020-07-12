import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as reac from "react-bootstrap";
import logo from "./logo.png";
import "./hrTags.css";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <reac.Navbar
          collapseOnSelect
          style={{
            padding: "10px",
            backgroundColor: "#00284d",
            fontSize: "medium",
          }}
          fixed="top"
          variant="dark"
        >
          <reac.Navbar.Brand>
            <div className="logo">
              <img alt="" src={logo} className="responsive" />
            </div>
          </reac.Navbar.Brand>
          <reac.Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <reac.Navbar.Collapse id="responsive-navbar-nav">
            <reac.Nav className="mr-auto"></reac.Nav>
            <reac.Nav style={{}}>
              <reac.NavItem>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </reac.NavItem>
              <reac.NavItem>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </reac.NavItem>
              <reac.NavItem>
                <Link className="nav-link" to={"/process"}>
                  Home
                </Link>
              </reac.NavItem>
            </reac.Nav>
          </reac.Navbar.Collapse>
        </reac.Navbar>
      </div>
    );
  }
}
