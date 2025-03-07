import './App.css';
import React, {createContext, useContext, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, mockShifts, signupPath} from "./constants";
import User from "./models/User";
import Shifts from "./models/Shifts";

export const UserContext = createContext();
export const ShiftsContext = createContext();

function App() {
    const [user, setUser] = useState(() => new User({}));
    const [shifts, setShifts] = useState([]);


    const onChange = (user) => {
        alert("welcome " + user.username + ". You are logged in");
        setUser(new User({username: user.username, password: user.password, isManager: false}));
        setShifts(new Shifts({userId: user.username,
            shifts:mockShifts.find(shift => shift.userId === user.username).shifts}));
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <ShiftsContext.Provider value={{shifts, setShifts}}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path={loginPath} element={
                                <Login
                                    onSuccess={onChange}
                                   />
                            }/>
                            <Route path={homePath} element={<Home/>}/>
                            <Route path={signupPath} element={<Signup/>}/>
                        </Routes>
                    </div>
                </Router>
            </ShiftsContext.Provider>
        </UserContext.Provider>

    );
}

export default App;
