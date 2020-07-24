import React from "react";
import * as reac from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import AuthApi from "../utils/AuthApi";
import "./hrTags.css";

export default function Navbar() {
  const authApi = React.useContext(AuthApi);
  const handleLogout = async () => {
    // console.log(res.data.auth);
    localStorage.removeItem("auth");
    localStorage.removeItem("email");
    localStorage.removeItem("userOBJ");
    localStorage.removeItem("state");
    authApi.setAuth(false);
  };

  return (
    // <reac.Navbar collapseOnSelect expand="lg" bg="success" variant="light" fixed = "top">
    <reac.Navbar
      collapseOnSelect
      style={{
        padding: "10px",
        backgroundColor: "#00284d",
        fontSize: "medium",
      }}
      fixed="top"
      variant="warning"
    >
      <reac.Navbar.Brand>
        <img alt="" src={logo} className="responsive" />{" "}
      </reac.Navbar.Brand>
      <reac.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <reac.Navbar.Collapse id="responsive-navbar-nav">
        <reac.Nav className="mr-auto"></reac.Nav>
        <reac.Nav>
          <reac.NavDropdown title="Account" id="collasible-nav-dropdown">
            <reac.NavDropdown.Item>
              <Link
                to={"/profile"}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "medium",
                }}
              >
                Home
              </Link>
            </reac.NavDropdown.Item>
            <reac.NavDropdown.Item>
              <Link
                to={"/changepassword"}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "medium",
                }}
              >
                Change Password
              </Link>
            </reac.NavDropdown.Item>
            <reac.NavDropdown.Item>
              <Link
                to={"/contactus"}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "medium",
                }}
              >
                Help
              </Link>
            </reac.NavDropdown.Item>
            <reac.NavDropdown.Item style={{ fontSize: "medium" }}>
              <a href onClick={handleLogout}>
                Logout
              </a>
            </reac.NavDropdown.Item>
          </reac.NavDropdown>
          &nbsp;&nbsp;
          <reac.NavItem>
            <Link className="nav-link" to={"/profile"}>
              Home
            </Link>
          </reac.NavItem>
          {/* <reac.NavItem>
                <Link className="nav-link" to={"/payments"}>
                  payments
                </Link>
              </reac.NavItem> */}
        </reac.Nav>
      </reac.Navbar.Collapse>
    </reac.Navbar>
  );
}
