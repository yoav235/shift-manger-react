import React from "react";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const daysArray = ["", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


function Requests(user) {
    return (
        <div>
            <h1>Requests</h1>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        {daysArray.map((day, i) => <TableCell key={i}>{day}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>available shifts</TableCell>
                    </TableRow>
                </TableBody>

            </TableContainer>
        </div>
    );
}

export default Requests;