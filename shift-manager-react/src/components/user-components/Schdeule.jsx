import React from "react";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    Checkbox, List, ListItem, FormControlLabel, Button
} from "@mui/material";

const daysArray = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


function Schedule() {







    return (
        <div>
            <h1>Schedule</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {daysArray?.map((day, i) => <TableCell key={i}>{day}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody></TableBody>



                </Table>
            </TableContainer>
        </div>
    );
}

export default Schedule;