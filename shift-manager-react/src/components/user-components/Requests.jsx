import React, {useEffect, useState} from "react";
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
import Shifts from "../../models/Shifts";


const daysArray = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const shiftsArray = ["morning", "middle", "evening", "night", "other"];


function Requests({shifts, onShiftChange}) {
    const [editingCell, setEditingCell] = useState([]);
    const [editedValues, setEditedValues] = useState(shifts || new Shifts({}));


    useEffect(() => {
        onShiftChange(editedValues);
    }, [editedValues, onShiftChange]);

    const handleDoubleClick = (day) => {
        setEditingCell((prev) =>
            prev.includes(day)
                ? prev.filter((cell) => cell !== day)  // Remove from array
                : [...prev, day]  // Add to array (create new reference)
        );
    };


    const toggleTable = () => {
        if (editingCell.length === 0) {
            setEditingCell(daysArray);
            return
        }
        setEditingCell([]);
    }

    const handleCheckboxChange = (day, shift) => {
        setEditedValues((prev) => {
            const updatedDayShifts = prev[day] ? [...prev[day]] : [];
            if (updatedDayShifts.includes(shift)) {
                updatedDayShifts.splice(updatedDayShifts.indexOf(shift), 1); // Remove if exists
            } else {
                updatedDayShifts.push(shift); // Add if not exists
            }
            return { ...prev, [day]: updatedDayShifts };
        });

    };




    return (
        <div>
            <h1>Requests</h1>
            <TableContainer component={Paper} sx={{width: "200vh"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell ><Button variant={"contained"} onClick={toggleTable}>Toggle Table</Button></TableCell>
                            {daysArray?.map((day, i) => <TableCell key={i}>{day}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>available shifts</TableCell>
                            {daysArray?.map((day, i) =>
                                <TableCell key={i} onDoubleClick={() => handleDoubleClick(day)}>
                                    {editingCell.includes(day) ? (
                                        <List>
                                            {shiftsArray?.map((shift, index) => (
                                                <ListItem key={index}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={editedValues[day]?.includes(shift) || false}
                                                                onChange={() => handleCheckboxChange(day, shift)}
                                                            />
                                                        }
                                                        label={shift}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                        ) : ( editedValues[day]?.length > 0
                                        ? editedValues[day].join(", ")
                                        : "No shifts")}

                                </TableCell>)
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Requests;