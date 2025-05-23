import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {DialogContent, DialogTitle, TextField, Button} from '@mui/material';
import User from "../models/User";
import {mockShifts, mockUsers} from "../constants";
import {handleLogin} from "../API";




function Login({onSuccess}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {setUser} = useContext(UserContext);
    // const {setShifts} = useContext(ShiftsContext);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (isLogged) {
            navigate("/home");
        }
    }, [isLogged, navigate]);

    const login = async () => {

        if(await handleLogin(onSuccess, mockUsers.find((user) => (user.email === username && user.password === password)), new User({username, password, isManager: false}))) {
            setIsLogged(true)
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
                        onClick={login}
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