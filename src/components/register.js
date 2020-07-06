import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./login.css";
import logo from "./logo.gif";
import * as reac from 'react-bootstrap';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      contact:"",
      password: "",
      cnfPassword: "",
      selectValue: "",
      loading: "false",
      errors: {},
      education: ""
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ education: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    document.getElementById("alerts").innerHTML = "";
  }

  updateName = (event) => {
    this.setState({ name: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };
  updateEmail = (event) => {
    this.setState({ email: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };
  updateCnfPassword = (event) => {
    this.setState({ cnfPassword: event.target.value });
    document.getElementById("alerts").innerHTML = "";
  };

  updateContact = (event) => {
    this.setState({ contact: event.target.value.slice(0,10) });
    document.getElementById("alerts").innerHTML = "";
  };

  validatePassword(inp) {
    if (inp.length >= 6 && inp.match(/[A-Z]/) && inp.match(/[a-z]/) && inp.match(/[0-9]/) && inp.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\//?]+/)) {
        return true
    } else {
        // alert("Password should consist of one upper case and lower case letter," + 
        // "one number, one special character and min length should be 6 chars");    //The pop up alert for a valid email address
        document.getElementById("alerts").innerHTML = "Password should consist of one upper case and lower case letter,one number, one special character and min length should be 6 chars";
        this.setState({
            password:"",
            cnfPassword:""
        })
        return false;
    }
}

  registerSubmit = (event) => {
    event.preventDefault();
    const { password, cnfPassword, name, contact} = this.state;
    if(name.length<=5){
      document.getElementById("alerts").innerHTML = "Name should be atleast 6 characters";
      this.setState({
        name:"",
      })
      return;
    }
    if(contact.length<10 || contact.length>10){
      document.getElementById("alerts").innerHTML = "Contact should be atleast 10 digits";
      this.setState({
        contact:"",
      })
      return;
    }
    if (password !== cnfPassword) {
      // alert("Confirm password doesn't match");
      document.getElementById("alerts").innerHTML = "Confirm password doesn't match";
      this.setState({
        password: "",
        cnfPassword: ""
      })
      return;
    }

    if (this.state.education === "" || this.state.education === "N/A") {
      document.getElementById("alerts").innerHTML = "education field should be selected";
      this.setState({
        education: ""
      })
      return;
    }
    if (this.validatePassword(this.state.password)) {
      const userDetails = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        selectValue: this.state.selectValue,
        contact: this.state.contact,
        education: this.state.education
      };
      console.log(userDetails)
      axios
        .post("https://flask-deploy-admissions.herokuapp.com/register", userDetails)
        .then((result) => {
          this.setState({
            loading: false,
          });
          if (result.data.statuscode === 400) {
            // alert("Email already exists")
            document.getElementById("alerts").innerHTML = "Email already exists. Please login to continue";
            this.setState({
              email: "",
              name: "",
              password: "",
              cnfPassword: "",
            })
            // window.location = "/login"
          } else if (result.data.statuscode === 500) {
            // alert(result.data.error)
            document.getElementById("alerts").innerHTML = result.data.message;
            this.setState({
              email: "",
              name: "",
              password: "",
              cnfPassword: "",
            })
          } else {
            window.location = "/login";
          }
          //this.props.history.push("/login")
        })
        .catch((error) => {
          this.setState({
            errors: error,
            loading: false,
          });
        });
    }
  };
  render() {
    return (
      <reac.Container>
            <reac.Row style = {{justifyContent: "center", justifyItems: "center", margin: "100px",  padding: "20px"}}>
              {/* <reac.Col></reac.Col>
              <reac.Col style = {{margin: "100px", padding: "40px 55px 45px 55px"}}> */}
              <div>
                    <div>
                        <a href="https://msitprogram.net/">
                          <img src={logo} alt="msitlogo" height="50px" />
                        </a>
                    </div>
                    <br></br>
                    <hr id="seven" data-symbol="REGISTER"></hr>

                    <reac.Form onSubmit = {this.registerSubmit}>
                      <br></br>
                      <p style = {{color : "red"}} id = "alerts"></p>
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
                      <reac.Form.Group controlId="formBasicEmail">
                      <reac.Form.Label>Email address</reac.Form.Label>
                      <reac.Form.Control type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            required={true}
                            value={this.state.email}
                            onChange={this.updateEmail} />
                      </reac.Form.Group>

                      <reac.Form.Group controlId="formBasicContact">
                      <reac.Form.Label>Contact Number</reac.Form.Label>
                      <reac.Form.Control 
                            type="number"
                            name="contact"
                            className="form-control"
                            minLength= "10"
                            maxLength="10"
                            placeholder="Enter Phone no"
                            required={true}
                            value={this.state.contact}
                            onChange={this.updateContact}
                      />
                      </reac.Form.Group>


                      <reac.Form.Group controlId="formBasicPassword">
                      <reac.Form.Label>Password</reac.Form.Label>
                      <reac.Form.Control type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            required={true}
                            value={this.state.password}
                            onChange={this.updatePassword}
                      />
                      </reac.Form.Group>
                      <reac.Form.Group controlId="formBasicConfirmPassword">
                      <reac.Form.Label>Confirm Password</reac.Form.Label>
                      <reac.Form.Control type="password"
                            className="form-control"
                            placeholder="Re-enter password"
                            required={true}
                            value={this.state.cnfPassword}
                            onChange={this.updateCnfPassword}
                      />
                      </reac.Form.Group>

                      <reac.Form.Group controlId="formBasicConfirmPassword">
                      <label>Education</label>
                          <div>
                            <div>
                              <div>
                                <select id="dropdown" value={this.state.education} onChange={this.handleChange}>
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
                                <select id="dropdown" onChange={this.handleDropdownChange}>
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
                      {/* </reac.Col>
                      <reac.Col></reac.Col> */}
            </div>
          </reac.Row>
        </reac.Container>
    );
  }
}
