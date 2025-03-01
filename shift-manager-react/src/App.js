import './App.css';
import React, {useContext, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, signupPath} from "./constants";
import User from "./models/User";
import {UserContext} from "./context/userContext";




function App() {
    const [user, setUser] = useState(() => new User({}));
    const [shifts, setShifts] = useState([]);

    const onShiftsChange = (shifts) => {
        setShifts(shifts);
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>

    );
}

export default App;
