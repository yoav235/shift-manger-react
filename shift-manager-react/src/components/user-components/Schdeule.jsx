import React, {useContext, useEffect} from "react";
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
import {daysArray, shiftsArray, schedule} from "../../constants";
import {ShiftsContext} from "../../App";



function Schedule() {

    useEffect(() => {
        console.log("Schedule shifts: ", schedule);
    }, []);




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
                            {shiftsArray?.map((shift, i) =>
                        <TableRow key={i}>
                            <TableCell>{shift}</TableCell>
                            {daysArray?.map((day, i) =>
                                <TableCell key={i}>
                                    {schedule.map((userShift) => {
                                        if (userShift.day === day && userShift.shifts[shift]) {
                                            return userShift.shifts[shift]?.join(", ");
                                        }
                                        return ""
                                    })}
                                </TableCell>

                            )}
                        </TableRow>
                        )}
                    </TableHead>
                    <TableBody></TableBody>



                </Table>
            </TableContainer>
        </div>
    );
}

export default Schedule;