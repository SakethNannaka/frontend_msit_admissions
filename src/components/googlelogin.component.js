import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
export class Glogin extends Component {

 
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
//   signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }
  render() {
    return (
      <div>
        <GoogleLogin
        clientId="506778935497-6alp0neas4141d67gbqdlt3rhoenq5k3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.onSignIn}
        onFailure={this.onSignIn}
        cookiePolicy={'single_host_origin'}
        
        />
        <button onClick={this.signOut}>Signout</button>
      </div>
    )
  }
}

export default Glogin