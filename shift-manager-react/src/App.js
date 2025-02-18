import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, signupPath} from "./constants";


function App() {
    const [user, setUser] = useState(null);
    const [shifts, setShifts] = useState([]);

    const onShiftsChange = (shifts) => {
        setShifts(shifts);
    }

    return (

        <Router>
            <div className="App">
                <Routes>
                    <Route path={loginPath} element={
                        <Login
                            onSuccessUser={(user) => setUser(user)}
                            onSuccessShifts={onShiftsChange}/>
                    }/>
                    <Route path={homePath} element={<Home user={user} onShiftChange={onShiftsChange} shifts={shifts}/>}/>
                    <Route path={signupPath} element={<Signup/>}/>
                </Routes>
            </div>
        </Router>

    );
}

export default App;
