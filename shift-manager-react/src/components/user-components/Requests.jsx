import React, {useContext, useEffect, useState} from "react";
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
import {ShiftsContext} from "../../App";
import {daysArray, shiftsArray} from "../../constants";





function Requests({onShiftChange, onSave}) {
    const {shifts} = useContext(ShiftsContext)
    const [editingCell, setEditingCell] = useState([]);
    const [editedValues, setEditedValues] = useState(shifts);

    useEffect(() => {
        setEditedValues(shifts);
        console.log("requested shifts: ", shifts);
        console.log("editedValues: ", editedValues);
    }, [shifts]);

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
            const updatedShifts = {
                ...prev.shifts, // Copy existing shifts object
                [day]: prev.shifts[day]?.includes(shift)
                    ? prev.shifts[day].filter((s) => s !== shift) // Remove shift
                    : [...(prev.shifts[day] || []), shift] // Add shift
            };

            return new Shifts({ userId: prev.userId, shifts: updatedShifts });
        });
    };







    return (
        <div>
            <h1>Requests</h1>
            <TableContainer component={Paper} sx={{width: "80vw", margin:"8px"}}>
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
                                                                checked={editedValues.shifts[day]?.includes(shift)}
                                                                onChange={() => handleCheckboxChange(day, shift)}
                                                            />
                                                        }
                                                        label={shift}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                        ) : ( editedValues.shifts[day]?.length > 0
                                        ? editedValues.shifts[day].join(", ")
                                        : "No shifts")
                                    }


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