import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, signupPath} from "./constants";





function App() {
    const [user, setUser] = useState(null);

    return (

      <Router>
        <div className="App">
          <Routes>
            <Route path={loginPath} element={<Login afterLogin={(user) => setUser(user)} />} />
            <Route path={homePath} element={<Home user={user}/>} />
            <Route path={signupPath} element={<Signup />} />
          </Routes>
        </div>
      </Router>

    );
}

export default App;
