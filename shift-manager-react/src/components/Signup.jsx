import {addUser} from "../util/send_to_db";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Paper} from "@mui/material";





const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser({email: username, password: password, isManager: false}).then(() => {
            setUsername("");
            setPassword("")
        })
            .then(() => navigate("/"));

    }

    return (
        <div style={{textAlign: "center", marginTop: "50px", direction: "ltr"}}>
            <DialogTitle>Sign Up</DialogTitle>

            <DialogContent>
                <Paper
                    sx={{
                        padding: "20px",
                        width: "30%",
                        margin: "auto", // Center horizontally
                        display: "flex", // Center content inside Paper
                        flexDirection: "column", // Stack content vertically
                        alignItems: "center", // Center items horizontally
                    }}
                >
                    <TextField
                        sx={{marginBottom: "20px", width: "100%"}}
                        label="User Name"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        sx={{marginBottom: "20px", width: "100%"}}
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{marginTop: "20px", width: "50%"}}
                    >
                        Sign Up
                    </Button>
                    <Button
                        onClick={goBack}
                        variant="contained"
                        sx={{marginTop: "20px", width: "50%", backgroundColor:"red"}}
                    >
                        Home Page
                    </Button>
                </Paper>
            </DialogContent>
        </div>
    );
}


export default Signup;



