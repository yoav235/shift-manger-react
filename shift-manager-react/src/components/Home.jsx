import React, {useContext, useEffect} from "react";
import Requests from "./user-components/Requests";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {loginPath} from "../constants";
import {ShiftsContext, UserContext} from "../App";


function Home() {
    const {shifts} = useContext(ShiftsContext);
    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(shifts);
    }, []);

    const handleReqSave = (shifts) => {
        console.log(shifts);
        alert("Saved");
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
            <h1>Hello {user?.name || ""}, welcome back!</h1>
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