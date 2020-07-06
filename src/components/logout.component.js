import React from "react";

import AuthApi from "../utils/AuthApi"
import Navbar1 from "./navbar1.component"

export default function Logout() {
    const authApi = React.useContext(AuthApi)
    const handleLogout = async () => {
        // console.log(res.data.auth);
    localStorage.removeItem('auth')
    localStorage.removeItem('email')
    localStorage.removeItem('userOBJ')
    localStorage.removeItem('state')
    authApi.setAuth(false)
    }
        return (
            <div>
                <Navbar1 Logout={handleLogout}/>
                {/* <reac.Button variant="primary" type="submit" onClick = {handleLogout}  style = {{margin: "300px"}}>
                  Logout
                </reac.Button> */}
            </div>
        )
}