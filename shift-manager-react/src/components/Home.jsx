import React, {useContext, useEffect} from "react";
import Requests from "./user-components/Requests";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {loginPath} from "../constants";
import {ShiftsContext, UserContext} from "../App";


function Home() {
    const {shifts, setShifts} = useContext(ShiftsContext);
    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Home shifts: ", shifts);
        console.log("Home user: ", user);
    }, [user, shifts]);

    const handleReqSave = (shifts) => {
        console.log("saved shifts: ", shifts);
        alert("Saved: " + shifts);
        setShifts(shifts);
        localStorage.setItem("shifts", JSON.stringify(shifts));
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Hello {user?.username || ""}, welcome back!</h1>
            <div style={{alignItems: "left"}}>
                <Button
                    variant="contained"
                    onClick={() => {
                        alert("Logged out")
                        navigate(loginPath);
                    }}
                    sx={{margin: "10px", backgroundColor: "red"}}
                >Log out</Button>
            </div>
            <Requests  onShiftChange={() => {}} onSave={handleReqSave}></Requests>
        </div>
    );
}

export default Home;