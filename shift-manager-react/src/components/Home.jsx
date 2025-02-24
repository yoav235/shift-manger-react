import React from "react";
import {TableContainer, TableCell, Table, TableBody, TableRow, Paper, TableHead} from "@mui/material";
import Requests from "./user-components/Requests";



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
        </div>
    );
}

export default Home;