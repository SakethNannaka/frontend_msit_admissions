import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Register from "../components/register";
import Login from "../components/Login";
import FgtPassword from "../components/forgotPassword";
import Navbar from "../components/navbar.component";
import Profile from "../components/profile.component";
import ChangePassword from "../components/changepassword.component"
import Logout from "../components/logout.component"
import Gat from "../components/gat.component"
import Walkin from "../components/walkin.component"
import Edit from "../components/editprofile.component";
import Contact from "../components/contact.component"
import AuthApi from "../utils/AuthApi"
import Process from "../components/process.component"

export default function Routes() {
    return (
        <Router>
            <div className="Container">
                <Navbar />
                <div className="auth-wrapper">
                    <div className="auth-inner">
                    <Switch>
                        <RouteRegisteration exact path='/process' component={Process} />
                        <RouteRegisteration exact path='/' component={Process} />
                        <RouteRegisteration path="/Login" component={Login} />
                        <RouteRegisteration path="/Register" component={Register} />
                        <RouteProtected path="/profile" component={Profile} />
                        <RouteRegisteration path = "/forgotpassword" component = {FgtPassword} />
                        <RouteProtected path="/gat" component={Gat} />
                        <RouteProtected path="/walkin" component={Walkin} />
                        <RouteProtected path= "/changepassword" component = {ChangePassword} />
                        <RouteProtected path= "/logout" component = {Logout} />
                        <RouteProtected path="/edit" component={Edit} />
                        <RouteProtected path = "/contactus" component = {Contact} />
                    </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}

const RouteRegisteration = ({ component: Component, ...rest }) => {
    const authAPI = useContext(AuthApi);
    return (
      <Route
        {...rest}
        render={(props) =>
          !authAPI.auth ? <Component {...props} /> : <Redirect to="/profile" />
        }
      />
    );
  };
  
  const RouteProtected = ({ component: Component, ...rest }) => {
    const authAPI = useContext(AuthApi);
    return (
      <Route
        {...rest}
        render={(props) =>
            authAPI.auth ? <Component {...props} /> : <Redirect to="/login"/>
        }
      />
    );
  };