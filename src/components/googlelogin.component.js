import React, { useContext, useState} from "react";
import GoogleLogin from 'react-google-login'
import AuthApi from "../utils/AuthApi"
import * as reac from 'react-bootstrap';

export default function Glogin(){
  const authApi = useContext(AuthApi);

 
  const responseGoogle = (googleUser) =>{
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    localStorage.setItem('email', profile.getEmail())
    authApi.setAuth(true);
    localStorage.setItem('auth', "Logged in");
    localStorage.setItem('email', profile.getEmail())
  }
  
  const Failed = (response)=>{
    console.log(response)
  }
    return (
      <div>
<GoogleLogin
    clientId="968104435960-tlorqb4lffa6um7p6tl5oit88fs06h7i.apps.googleusercontent.com"
    render={renderProps => (
              <reac.Button variant="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} >Google Login</reac.Button>             

    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={Failed}
    cookiePolicy={'single_host_origin'}
  />,
      </div>
    )
}
