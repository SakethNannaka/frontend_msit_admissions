import React from "react";
import axios from "axios";
//imported files
import logo from "./logo.gif";
//ui
import * as reac from "react-bootstrap";
import "./profile.css"

/**
 * This page is for changing password whenever forgot it.It requires registered mail.
 * When user enters the registered mail and click on 'get OTP' button then he gets an otp
 * to registered mail.When otp sent to mail user gets an alert message that 'check the mail for otp'
 * Then he have to enter the OTP, new password and confirm password.
 * Lastly click on update password.Then he get a alert message that 'password is updated sucessfully'.
 */

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      otp: "",
      newOtp: "",
      newPassword: "",
      cnfPassword: "",
      errors: {},
      //loading field is to avoid multiple clicks on button.
      //It avoid duplicate operations and increase stability
      loading: false,
      //updating field also disabled the enter otp, newpassword fields untill user get
      //alert message that 'otp sent to registered mail'. Then updating changes to false and
      // that fields become active to enter data.
      updating: true,
      buttonDisabled: true,
    };
  }
  validatePassword() {
    let { newPassword } = this.state;
    if (
      newPassword.length >= 6 &&
      newPassword.match(/[A-Z]/) &&
      newPassword.match(/[a-z]/) &&
      newPassword.match(/[0-9]/) &&
      newPassword.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\//?]+/)
    ) {
      document.getElementById("alerts").innerHTML = "";
      return true;
    } else {
      document.getElementById("alerts").innerHTML =
        "please enter a valid password in which it should consist of one upper case letter, one lower case letter," +
        "one number, one special character and min length should be 6 chars";
      return false;
    }
  }
  validateOtp() {
    const { newOtp, otp } = this.state;
    if (newOtp !== otp) {
      document.getElementById("alerts").innerHTML = "otp doesn't match";
      return false;
    } else {
      document.getElementById("alerts").innerHTML = "";
      return true;
    }
  }
  /**
   * This method is to submit email and updated password details to server.
   * First we checked both the new password and confirm password are same otherwise it gives
   * an alert message that 'confirm password doen't match' and ask user correct credentials.
   * Then w
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { newPassword, cnfPassword } = this.state;
    console.log("pass", newPassword);
    console.log("new", cnfPassword);
    if (newPassword !== cnfPassword) {
      document.getElementById("alerts").innerHTML =
        "Confirm password didn't match";
      return;
    }
    console.log("okay");
    this.setState({
      buttonDisabled: true,
    });
    const loginData = {
      email: this.state.email,
      password: this.state.newPassword,
    };
    axios
      .post("https://flask-deploy-admissions.herokuapp.com/changepassword", loginData)
      .then((response) => {
        this.setState({
          buttonDisabled: false,
        });
        let data = response.data;
        if (data.statuscode === 200) {
          alert("Password Updated Sucessfully");
          window.location = "/login";
          //this.props.history.push("/login")
        } else {
          alert("Updation failed!! Please enter password again");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong!! please try again");
      });
  };

  /**
   * This method to get OTP. When user enters registered mail and click on the 'Get OTP'
   * then it calls this method. It disable the multiple submissions using 'loading' variable.
   * Secondly, It sends post request to server along with entered email. If server sends otp sucessfully
   * then it returns success and an alert message shows to user that "Otp sent to your registered email".
   */
  getOTP = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const emailId = {
      email: this.state.email,
    };
    axios
      .post("https://flask-deploy-admissions.herokuapp.com/forgot", emailId)
      .then((response) => {
        let data = response.data;
        if (data.statuscode === 200) {
          alert("Otp sent to your registered email");
          this.setState({
            newOtp: data.otp,
            loading: false,
            updating: false,
            buttonDisabled: false,
          });
        } else {
          document.getElementById("alerts").innerHTML =
            "Please enter correct registered mail";
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
        alert("Something went wrong!! please try again");
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <reac.Container>
        <reac.Row style = {{justifyContent: "center", justifyItems: "center",  margin: "100px", padding: "20px"}}>
          {/* <reac.Col></reac.Col>
          <reac.Col style={{ margin: "100px", padding: "40px 55px 45px 55px" }}> */}
          <div>
          <div>
              <a href="https://msitprogram.net/">
                <img src={logo} alt={"msitprogram"} height="50px" />
              </a>
            </div>
            <br></br>
            <h4 align="center">Forgot Password</h4>
            <br></br>
            <p style={{ color: "red" }} id="alerts"></p>
            <reac.Form.Group className="formBasicEmail">
              <reac.Form.Label>Email</reac.Form.Label>
              <div className="emailOtp">
                <reac.Form.Control
                  type="email"
                  variant="outlined"
                  size="small"
                  value={this.state.email}
                  onChange={this.updateEmail}
                  placeholder="eg: xyz@gmail.com"
                  required
                />
                <br></br>
                {/*This button is imported from materials-ui@core. It is used alternative to input tag*/}
                <reac.Button
                  // variant="contained"
                  disabled={this.state.loading}
                  className="otp"
                  onClick={this.getOTP}
                  variant="primary"
                >
                  Get OTP
                </reac.Button>
              </div>
            </reac.Form.Group>
            {/*This form contains fields 'enter otp', 'new password' and 'confirm password'*/}
            <reac.Form onSubmit={this.handleSubmit} class="content">
              <div className="form-group">
                <reac.Form.Label>Enter OTP:</reac.Form.Label>
                <reac.Form.Control
                  type="text"
                  placeholder="One Time Password"
                  value={this.state.otp}
                  onChange={this.updateOTP}
                  disabled={this.state.updating}
                  required
                />
              </div>
              <div className="form-group">
                <reac.Form.Label> New Password:</reac.Form.Label>
                <reac.Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.updatePassword}
                  placeholder="eg: Aa@123aZXct"
                  disabled={this.state.updating}
                  required
                />
              </div>
              <div className="form-group">
                <reac.Form.Label>Confirm New Password:</reac.Form.Label>
                <reac.Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  value={this.state.cnfPassword}
                  onChange={this.updateCnfPassword}
                  disabled={this.state.updating}
                  required="true"
                />
              </div>
              <br></br>
              <div className="login-button">
                <reac.Button
                  type="submit"
                  disabled={this.state.buttonDisabled}
                  variant="primary"
                  block
                >
                  Update Password
                </reac.Button>
              </div>
            </reac.Form>
          {/* </reac.Col>
          <reac.Col></reac.Col> */}
          </div>
        </reac.Row>
      </reac.Container>
    );
  }

  /**
   * These methods to update the state variables when user enters anything
   * in the respective field.
   */
  updateEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  updatePassword = (event) => {
    this.validateOtp();
    this.setState({
      newPassword: event.target.value,
    });
  };
  updateCnfPassword = (event) => {
    this.validatePassword();
    this.setState({
      cnfPassword: event.target.value,
    });
  };
  updateOTP = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };
}

export default ForgotPassword;
