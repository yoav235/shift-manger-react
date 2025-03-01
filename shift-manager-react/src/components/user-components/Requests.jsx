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
import SaveIcon from '@mui/icons-material/Save';
import Shifts from "../../models/Shifts";


const daysArray = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const shiftsArray = ["morning", "middle", "evening", "night", "other"];


function Requests({shifts, onShiftChange, onSave}) {
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

    const handleSave = () => {
        onSave(editedValues);
    }

    const toggleTable = () => {
        if (editingCell.length === 0) {
            setEditingCell(daysArray);
            return
        }
        setEditingCell([]);
    }

    const handleCheckboxChange = (day, shift) => {
        setEditedValues((prev) => {
            const updatedDayShifts = prev[day] || [];

            return {
                ...prev,
                [day]: updatedDayShifts.includes(shift)
                    ? updatedDayShifts.filter((s) => s !== shift) // Remove if exists
                    : [...updatedDayShifts, shift] // Add if not exists
            };
        });
    };





    return (
        <div>
            <h1>Requests</h1>
            <TableContainer component={Paper} sx={{width: "200vh", margin:"8px"}}>
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
                <Button
                    variant={"contained"}
                    startIcon={<SaveIcon />}
                    sx={{margin: "8px"}}
                    onClick={handleSave}
                >save</Button>
            </TableContainer>

        </div>
    );
}

export default Requests;