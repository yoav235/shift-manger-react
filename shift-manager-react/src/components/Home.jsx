import React from "react";
import {TableContainer, TableCell, Table, TableBody, TableRow, Paper, TableHead} from "@mui/material";


const daysArray = ["", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function Home({user}) {
    return (
        <div>
            <h1>Hello {user?.name || ""}, welcome back!</h1>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        {daysArray.map((day, i) => <TableCell key={i}>{day}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>morning</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>middle</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>evening</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>night</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>comments</TableCell>
                    </TableRow>
                </TableBody>

            </TableContainer>
        </div>
    );
}

export default Home;