import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Routes from "./routes/routes.routes"
import AuthApi from "./utils/AuthApi"
// import { hassigned } from "./components/auth-api"


function App() {
  const [auth, setAuth] = useState(false);

  const readSession = async () => {
    const res = localStorage.getItem('auth')
    console.log(res)
    if (res) {
      setAuth(true);
    }
  }
  useEffect ( () => {
    readSession();
  }, [])
  return (
    <AuthApi.Provider value = {{auth, setAuth}}>
      <div className = "container">
        <Router>
          <Routes />
        </Router>
      </div>
    </AuthApi.Provider>
  );
}
export default App;
