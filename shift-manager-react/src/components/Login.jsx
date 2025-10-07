import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {DialogContent, DialogTitle, TextField, Button, CircularProgress} from '@mui/material';
import User from "../models/User";
import Shifts from "../models/Shifts";
import {handleLogin} from "../API";
import loginUser from "../util/user_util";
import fetchShifts from "../util/shifts_util";
import Cookies from 'js-cookie';




function Login({onSuccess}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {setUser} = useContext(UserContext);
    // const {setShifts} = useContext(ShiftsContext);
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (isLogged) {
            navigate("/home");
        }
    }, [isLogged, navigate]);

    const login = async () => {
        setLoading(true);
        try {
            const isTrue = await loginUser(username, password);

            const user = new User({username: isTrue.email,
                password: isTrue.password,
                isManager: isTrue.isManager});

            Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Save user to cookie
            const shifts = await fetchShifts(isTrue._id);
            console.log("Fetched shifts: ", shifts);
            Cookies.set('shifts', JSON.stringify(shifts), { expires: 1 }); // Save shifts to cookie
            if(handleLogin(onSuccess, isTrue, user, shifts)) {
                setIsLogged(true);
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error: ", error);
            alert("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const goToSignup = () => {
        navigate("/signup");
    }


    return (
        <div style={{textAlign: "center", marginTop: "50px", direction: "ltr"}}>
            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <CircularProgress style={{ marginBottom: '20px' }} />
                    <h1 style={{ fontSize: '1.5rem', color: '#555' }}>נכנס למערכת</h1>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default Login;