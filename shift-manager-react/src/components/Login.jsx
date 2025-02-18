import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DialogContent, DialogTitle, TextField, Button} from '@mui/material';


function Login({onSuccessUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (username === "admin" && password === "admin") {
            alert("welcome " + username + ". You are logged in");
            onSuccessUser({name: username});
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