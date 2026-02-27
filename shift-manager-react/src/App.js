import './App.css';
import React, {createContext, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, signupPath} from "./constants";
import User from "./models/User";
import Shifts from "./models/Shifts";

export const UserContext = createContext();
export const ShiftsContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    const [shifts, setShifts] = useState(null);



    const onChange = (user, shifts) => {
        alert("welcome " + shifts[0].name + ". You are logged in");
        setUser(new User({username: user.username, password: user.password, isManager: user.isManager}));
        setShifts(new Shifts({shiftId: shifts[0].shiftId,name: shifts[0].name, shifts:shifts[0].shifts}));
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
