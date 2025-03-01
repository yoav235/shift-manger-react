import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {DialogContent, DialogTitle, TextField, Button} from '@mui/material';
import User from "../models/User";
import Shifts from "../models/Shifts";

const mockUsers = [
    new User({ username: "alice", password: "pass123", isManager: false }),
    new User({ username: "bob", password: "adminpass", isManager: true }),
    new User({ username: "charlie", password: "charlie123", isManager: false }),
    new User({ username: "david", password: "davidpass", isManager: false }),
];

const mockShifts = [
    new Shifts({
        userId: "alice",
        shifts: {
            sunday: [],
            monday: ["morning"],
            tuesday: [],
            wednesday: ["evening"],
            thursday: [],
            friday: ["night"],
            saturday: []
        }
    }),
    new Shifts({
        userId: "bob",
        shifts: {
            sunday: [],
            monday: [],
            tuesday: ["morning", "night"],
            wednesday: [],
            thursday: ["middle"],
            friday: [],
            saturday: ["evening"]
        }
    }),
    new Shifts({
        userId: "charlie",
        shifts: {
            sunday: ["night"],
            monday: [],
            tuesday: [],
            wednesday: ["morning"],
            thursday: [],
            friday: ["afternoon"],
            saturday: []
        }
    }),
    new Shifts({
        userId: "david",
        shifts: {
            sunday: [],
            monday: ["middle", "evening"],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: ["morning"]
        }
    })
];

function Login({onSuccessUser, onSuccessShifts}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {

        if (mockUsers.find((user) => (user.username === username && user.password === password))) {
            alert("welcome " + username + ". You are logged in");
            onSuccessUser(new User({username: username, password: password, isManager: false}));
            onSuccessShifts(new Shifts({userId: username,
                shifts:mockShifts.find(shift => shift.userId === username).shifts}));
            navigate("/home");
        } else {
            alert("Invalid username or password");
        }
    }

    const goToSignup = () => {
        navigate("/signup");
    }


    return (
        <div style={{textAlign: "center", marginTop: "50px", direction: "ltr"}}>
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        sx={{margin: "20px", width: "20%"}}
                        label="User Name"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{marginBottom: "20px", width: "20%"}}
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Center the button */}
                <div>
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        sx={{marginTop: "20px", width: "15%"}}
                    >
                        Login
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={goToSignup}
                        sx={{marginTop: "20px", width: "15%"}}
                    >
                        Sign Up
                    </Button>
                </div>
            </DialogContent>
        </div>
    );
}

export default Login;