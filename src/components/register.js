import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./logo.gif";
import * as reac from "react-bootstrap";
// import "../index.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      contact: "",
      password: "",
      cnfPassword: "",
      selectValue: "",
      loading: "false",
      errors: {},
      education: "",
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    this.setState({ education: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    document.getElementById("alerts").innerHTML = "";
  }

  updateName = (event) => {
    console.log(event.target.name, event.target.value);
    this.setState({ name: event.target.value });
    document.getElementById("alerts1").innerHTML = "";
    if (this.state.name.length < 2) {
      document.getElementById("alerts1").innerHTML =
        "<span> Name should be atleast 3 characters</span>";
    } else {
      document.getElementById("alerts1").innerHTML = "";
    }
  };
  updateEmail = (event) => {
    console.log(event.target.name, event.target.value);
    this.setState({ email: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };

  updatePassword = (event) => {
    console.log(event.target.name, event.target.value);
    if (this.validatePassword(event.target.value)) {
      document.getElementById("alerts4").innerHTML = "";
    } else {
      document.getElementById("alerts4").innerHTML =
        "<span>Password must have at least LC, UC, Num, SC</span>";
    }
    this.setState({ password: event.target.value });
  };
  updateCnfPassword = (event) => {
    console.log(event.target.name, event.target.value);
    console.log(this.state.password, this.state.cnfPassword);
    if (event.target.value === this.state.password) {
      document.getElementById("alerts5").innerHTML = "";
    } else {
      document.getElementById("alerts5").innerHTML =
        "<span>Password's Doesn't match</span>";
    }
    this.setState({ cnfPassword: event.target.value });
  };

  updateContact = (event) => {
    console.log(event.target.name, event.target.value);
    this.setState({ contact: event.target.value.slice(0, 10) });
    if (this.state.contact.length < 9) {
      document.getElementById("alerts2").innerHTML =
        "<span>Contact should be atleast 10 digits</span>";
    } else {
      document.getElementById("alerts2").innerHTML = "";
    }
  };

  validatePassword(inp) {
    if (
      inp.length >= 6 &&
      inp.match(/[A-Z]/) &&
      inp.match(/[a-z]/) &&
      inp.match(/[0-9]/) &&
      inp.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\//?]+/)
    ) {
      return true;
    } else {
      return false;
    }
  }

  registerSubmit = (event) => {
    event.preventDefault();
    const { password, cnfPassword, name, contact } = this.state;
    if (name.length < 3) {
      document.getElementById("alerts1").innerHTML =
        "Name should be atleast 3 characters";
      this.setState({
        name: "",
      });
      return;
    }
    if (contact.length < 9) {
      document.getElementById("alerts2").innerHTML =
        "Contact should be atleast 10 digits";
      this.setState({
        contact: "",
      });
      return;
    }
    if (password !== cnfPassword) {
      document.getElementById("alerts5").innerHTML = "Password's doesn't match";
      this.setState({
        password: "",
        cnfPassword: "",
      });
      return;
    }

    if (this.state.education === "" || this.state.education === "N/A") {
      document.getElementById("alerts6").innerHTML =
        "Education field should be selected";
      this.setState({
        education: "",
      });
      return;
    }
    if (this.validatePassword(this.state.password)) {
      const userDetails = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        selectValue: this.state.selectValue,
        contact: this.state.contact,
        education: this.state.education,
      };
      console.log(userDetails);
      axios
        .post(
          "https://flask-deploy-admissions.herokuapp.com/register",
          userDetails
        )
        .then((result) => {
          this.setState({
            loading: false,
          });
          if (result.data.statuscode === 400) {
            document.getElementById("alerts").innerHTML =
              "Email already exists. Please login to continue";
            this.setState({
              email: "",
              name: "",
              password: "",
              cnfPassword: "",
            });
            // window.location = "/login"
          } else if (result.data.statuscode === 500) {
            document.getElementById("alerts").innerHTML = result.data.message;
            this.setState({
              email: "",
              name: "",
              password: "",
              cnfPassword: "",
            });
          } else {
            window.location = "/login";
          }
        })
        .catch((error) => {
          this.setState({
            errors: error,
            loading: false,
          });
        });
    } else {
      this.setState({
        password: "",
        cnfPassword: "",
      });
    }
  };
  render() {
    return (
      <reac.Container>
        <reac.Row
          style={{
            justifyContent: "center",
            justifyItems: "center",
            margin: "100px",
            padding: "20px",
          }}
        >
          <div>
            <div>
              <a href="https://msitprogram.net/">
                <img src={logo} alt="msitlogo" height="50px" />
              </a>
            </div>
            <br></br>
            <hr id="seven" data-symbol="REGISTER"></hr>
            <span style={{ color: "red", fontSize: "10px" }} id="alerts"></span>

            <reac.Form
              onSubmit={this.registerSubmit}
              style={{ fontSize: "medium" }}
            >
              <br></br>
              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts1"
              ></span>

              <reac.Form.Group className="formBasicUsername">
                <reac.Form.Label>User Name</reac.Form.Label>
                <reac.Form.Control
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  required={true}
                  value={this.state.name}
                  onChange={this.updateName}
                />
              </reac.Form.Group>

              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts3"
              ></span>

              <reac.Form.Group controlId="formBasicEmail">
                <reac.Form.Label>Email address</reac.Form.Label>
                <reac.Form.Control
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  required={true}
                  value={this.state.email}
                  onChange={this.updateEmail}
                />
              </reac.Form.Group>
              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts2"
              ></span>

              <reac.Form.Group controlId="formBasicContact">
                <reac.Form.Label>Contact Number</reac.Form.Label>
                <reac.Form.Control
                  type="number"
                  name="contact"
                  className="form-control"
                  minLength="10"
                  maxLength="10"
                  placeholder="Enter Phone no"
                  required={true}
                  value={this.state.contact}
                  onChange={this.updateContact}
                />
              </reac.Form.Group>

              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts4"
              ></span>

              <reac.Form.Group controlId="formBasicPassword">
                <reac.Form.Label>Password</reac.Form.Label>
                <reac.Form.Control
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  required={true}
                  value={this.state.password}
                  onChange={this.updatePassword}
                />
              </reac.Form.Group>

              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts5"
              ></span>

              <reac.Form.Group controlId="formBasicConfirmPassword">
                <reac.Form.Label>Confirm Password</reac.Form.Label>
                <reac.Form.Control
                  type="password"
                  name="cnfPassword"
                  className="form-control"
                  placeholder="Re-enter password"
                  required={true}
                  value={this.state.cnfPassword}
                  onChange={this.updateCnfPassword}
                />
              </reac.Form.Group>
              <span
                style={{ color: "red", fontSize: "10px" }}
                id="alerts6"
              ></span>

              <reac.Form.Group controlId="formBasicConfirmPassword">
                <label>Education</label>
                <div>
                  <div>
                    <div>
                      <select
                        id="dropdown"
                        value={this.state.education}
                        onChange={this.handleChange}
                      >
                        <option value="N/A">Select</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.E">B.E</option>
                      </select>
                    </div>
                  </div>
                </div>
              </reac.Form.Group>

              <reac.Form.Group controlId="formBasicConfirmPassword">
                <label>How do you know about MSIT</label>
                <div>
                  <div>
                    <div>
                      <select
                        id="dropdown"
                        onChange={this.handleDropdownChange}
                      >
                        <option value="N/A">N/A</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friends or Collegues">
                          Friends or Collegues
                        </option>
                        <option value="Alumni">Alumni</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </reac.Form.Group>

              <reac.Button variant="primary" type="submit" block>
                Submit
              </reac.Button>
              <p className="forgot-password text-right">
                Already registered <Link to="/login">Login</Link>
              </p>
            </reac.Form>
          </div>
        </reac.Row>
      </reac.Container>
    );
  }
}
