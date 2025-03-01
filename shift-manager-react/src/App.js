import './App.css';
import React, {createContext, useContext, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import {homePath, loginPath, signupPath} from "./constants";
import User from "./models/User";


export const UserContext = createContext();
export const ShiftsContext = createContext();

function App() {
    const [user, setUser] = useState(() => new User({}));
    const [shifts, setShifts] = useState([]);

    const onShiftsChange = (shifts) => {
        console.log("Shifts changed: ", shifts);
        setShifts(shifts);
    }

    const onUserChange = (user) => {
        console.log("User changed: ", user);
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <ShiftsContext.Provider value={{shifts, setShifts}}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path={loginPath} element={
                                <Login
                                    onSuccessUser={onUserChange}
                                    onSuccessShifts={onShiftsChange}/>
                            }/>
                            <Route path={homePath} element={<Home user={user} onShiftChange={onShiftsChange} shifts={shifts}/>}/>
                            <Route path={signupPath} element={<Signup/>}/>
                        </Routes>
                    </div>
                </Router>
            </ShiftsContext.Provider>
        </UserContext.Provider>

    );
}

export default App;
