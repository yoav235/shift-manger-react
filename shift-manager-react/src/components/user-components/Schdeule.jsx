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
import {daysArray, mockShifts, shiftsArray} from "../../constants";
import {ShiftsContext} from "../../App";



function Schedule() {

    useEffect(() => {
        console.log("Schedule shifts: ", mockShifts);
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
                                    {mockShifts.map((userShift) => {
                                        if (userShift.shifts[day] === shift) {
                                            return <div>{userShift.userId}</div>
                                        }
                                        return "nothing"
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