import React, {Component} from 'react';
import axios from "axios";
import * as reac from 'react-bootstrap';
import logo from "./logo.gif";

import Navbar from "./navbar1.component"

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: "",
            confirmpassword: ""
        }
        
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
        document.getElementById("pwd").innerHTML = "";
    }

    onChangeConfirmPassword(e) {
        this.setState({confirmpassword: e.target.value});
        document.getElementById("pwd").innerHTML = "";
    }

    validatePassword(inp) {
        if (inp.length >= 6 && inp.match(/[A-Z]/) && inp.match(/[a-z]/) && inp.match(/[0-9]/) && inp.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\//?]+/)) {
            return true
        } else {
            // alert("Password should consist of one upper case and lower case letter," + 
            // "one number, one special character and min length should be 6 chars");    //The pop up alert for a valid email address
            document.getElementById("pwd").innerHTML = "Password should consist of one upper case and lower case letter,one number, one special character and min length should be 6 chars";
            this.setState({
                password:"",
                confirmpassword:""
            })
            return false;
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.password !== this.state.confirmpassword){
            // alert("passwords doesn't match")
            document.getElementById("pwd").innerHTML = "passwords doesn't match";
            return false; // The form won't submit
        }

        if (this.validatePassword(this.state.password)) {
            const User = {
                email: localStorage.getItem('email'),
                password: this.state.password
            }
            console.log(User)
            axios.post('https://flask-deploy-admissions.herokuapp.com/changepassword', User)
            .then(res => {
                if (res.data.message === 'sucessfully updated password') {
                // alert(res.data.message)
                document.getElementById("pwd").innerHTML = "Password updated";
                window.location = '/profile'
            } else {
                // alert(res.data.message)
                document.getElementById("pwd").innerHTML = res.data.message
                this.setState({
                    email:"",
                    password:"",
                    confirmpassword:""
                })
            }
        });
    }
}
    render() {
        return (
            <div>
                
            <Navbar />
            <reac.Container>
            <reac.Row style = {{justifyContent: "center", justifyItems: "center",  margin: "100px",  padding: "20px"}}>
              {/* <reac.Col></reac.Col>
              <reac.Col style = {{margin: "150px"}}> */}
              <div>
              <div className = "ml-auto">
                        <a href="https://msitprogram.net/">
                          <img src={logo} alt = "msitlogo" height = "50px"/>
                        </a>
                </div>
                <br></br>
                <reac.Form onSubmit = {this.onSubmit} className = "login-form">
                <h3>ChangePassword</h3>
                <br></br>

                <reac.Form.Group controlId="formBasicPassword">
                    <reac.Form.Label>Password</reac.Form.Label>
                    <reac.Form.Control type="password" placeholder="Password" name = "password" autoComplete="password" onChange = {this.onChangePassword} required/>
                </reac.Form.Group>
                <reac.Form.Text id = "pwd"></reac.Form.Text>
                <reac.Form.Group controlId="formBasicConfirmPassword">
                    <reac.Form.Label>Confirm Password</reac.Form.Label>
                    <reac.Form.Control type="password" className="form-control" placeholder="Re enter password" value = {this.state.confirmpassword} onChange = {this.onChangeConfirmPassword} required/>
                </reac.Form.Group>
                <reac.Form.Text id = "cfmpwd"></reac.Form.Text>
                <br></br>
                <br></br>
                <reac.Button variant="primary" type="submit">
                    Submit
                </reac.Button>
            </reac.Form>
              </div>
              
            {/* </reac.Col>
            <reac.Col></reac.Col> */}
            </reac.Row>
        </reac.Container>
        </div>
        );
    }
}