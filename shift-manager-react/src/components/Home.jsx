import React from "react";
import {TableContainer, TableCell, Table, TableBody, TableRow, Paper, TableHead} from "@mui/material";
import Requests from "./user-components/Requests";
import Schdeule from "./user-components/Schdeule";
import {UserContext} from "../context/userContext";



function Home({user, shifts, onShiftChange}) {
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
            <Requests shifts={shifts} onShiftChange={onShiftChange}></Requests>
            <Schdeule></Schdeule>

        </div>
    );
}

export default Home;