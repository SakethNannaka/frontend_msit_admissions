import React, { useContext, useState } from "react";
import logo from "./logo.gif";
import axios from "axios";
import { Link } from "react-router-dom";
import * as reac from "react-bootstrap";
import AuthApi from "../utils/AuthApi";
import "./hrTags.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const authApi = useContext(AuthApi);
  const [loading, setLoading] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };

    const res = axios
      .post("https://flask-deploy-admissions.herokuapp.com/login", loginData)
      .then((response) => {
        setLoading(false);
        let data = response.data;
        if (data.auth) {
          authApi.setAuth(true);
          localStorage.setItem("auth", data.auth);
          localStorage.setItem("email", email);
          // window.location = "/profile";
        } else {
          document.getElementById("alerts").innerHTML = data.message;
        }
      })
      .catch((error) => {
        console.log(error);
        //alert("Something went wrong!! please try again");
      });
    return await res;
  };

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
        {/* <reac.Col></reac.Col> */}
        {/* <reac.Col style={{ margin: "100px", padding: "40px 55px 45px 55px" }}> */}
        <div>
          <div>
            <a href="https://msitprogram.net/">
              <img src={logo} alt="msitlogo" height="50px" />
            </a>
          </div>
          <br></br>
          <hr id="seven" data-symbol="LOGIN"></hr>
          <br></br>
          <p style={{ color: "red" }} id="alerts"></p>
          <reac.Form onSubmit={loginSubmit} className="content" style={{fontSize:"medium"}}>
            <reac.Form.Group className="form-group">
              <reac.Form.Label>Email address</reac.Form.Label>
              <reac.Form.Control
                type="email"
                placeholder="eg: xyz@gmail.com"
                name="email"
                autoComplete="email"
                onChange={updateEmail}
                value={email}
                variant="outlined"
                required
              />
            </reac.Form.Group>

            <reac.Form.Group className="form-group">
              <reac.Form.Label>Password</reac.Form.Label>
              <reac.Form.Control
                type="password"
                placeholder="eg: Aa@123aZXct"
                name="password"
                autoComplete="password"
                onChange={updatePassword}
                value={password}
                required
              />
            </reac.Form.Group>

            <reac.Button variant="primary" type="submit" block>
              Submit
            </reac.Button>
          </reac.Form>

          <div className="footer">
            <div className="d-flex flex-nowrap">
              <Link className="order-1 p-2" to="/Register">
                Register Here &nbsp; &nbsp; &nbsp;
              </Link>
              <Link className="order-3 p-2" to="/forgotPassword">
                Forgot Password?
              </Link>
            </div>
            {/* <div className="mr-auto">
                  <Link to="/register" className="register">
                    I want to register
                  </Link>
                </div> */}
          </div>
        </div>
        {/* </reac.Col> */}
        {/* <reac.Col></reac.Col> */}
      </reac.Row>
    </reac.Container>
  );
}
