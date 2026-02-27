import React, {useContext, useEffect, useState} from "react";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    Checkbox, List, ListItem, FormControlLabel, Button, Box, TextField, Alert
} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import SaveIcon from '@mui/icons-material/Save';
import dayjs from 'dayjs';
import Shifts from "../../models/Shifts";
import {ShiftsContext} from "../../App";
import {daysArray, shiftsArray} from "../../constants";





function Requests({onShiftChange, onSave}) {
    const {shifts} = useContext(ShiftsContext)
    const [editingCell, setEditingCell] = useState([]);
    const [editedValues, setEditedValues] = useState(shifts);
    const [timeErrors, setTimeErrors] = useState({});

    useEffect(() => {
        setEditedValues(shifts);
        console.log("requested shifts: ", shifts);
        console.log("editedValues: ", editedValues);
    }, [shifts]);

    useEffect(() => {
        onShiftChange(editedValues);
    }, [editedValues, onShiftChange]);

    const validateTimeRange = (day, startTime, endTime) => {
        if (!startTime || !endTime) return true; // Allow empty times
        
        const start = new Date(`2000-01-01 ${startTime}`);
        const end = new Date(`2000-01-01 ${endTime}`);
        
        return start < end;
    };

    const handleTimeChange = (day, field, time) => {
        const currentHours = editedValues?.otherShiftHours?.[day] || {};
        const newHours = {
            ...currentHours,
            [field]: time
        };

        // Validate time range
        const isValid = validateTimeRange(day, newHours.startTime, newHours.endTime);
        
        setTimeErrors(prev => ({
            ...prev,
            [day]: isValid ? null : 'Start time must be before end time'
        }));

        setEditedValues((prev) => {
            const updatedOtherShiftHours = {
                ...prev.otherShiftHours,
                [day]: newHours
            };

            return new Shifts({ 
                userId: prev.userId, 
                shifts: prev.shifts,
                otherShiftHours: updatedOtherShiftHours
            });
        });
    };

    const formatTimeDisplay = (day) => {
        const hours = editedValues?.otherShiftHours?.[day];
        if (!hours?.startTime || !hours?.endTime) return '';
        
        const startTime = dayjs(`2000-01-01 ${hours.startTime}`).format('h:mm A');
        const endTime = dayjs(`2000-01-01 ${hours.endTime}`).format('h:mm A');
        return ` (${startTime}-${endTime})`;
    };

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

            return new Shifts({ shiftId: prev.shiftId, name: prev.name, shifts: updatedShifts });
        });
    };

    if (!editedValues) {
        return <h2>Loading...</h2>;
    }





    return (
        <div className={"requests"}>
            <h1>Requests</h1>
            <TableContainer
                component={Paper}
                sx={{
                    width: editingCell.length < 3 ? "80vw" : "100%",
                    margin: editingCell.length < 3 ? "8px auto" : "0px",
                    transition: "width 0.3s ease",
                    overflowX: "hidden"
                }}
            >
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
                                    <Collapse in={editingCell.includes(day)} timeout="auto" unmountOnExit>
                                        <List dense>
                                            {shiftsArray?.map((shift, index) => (
                                                <ListItem key={index} sx={{ paddingY: 0 }}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={editedValues.shifts[day]?.includes(shift)}
                                                                onChange={() => handleCheckboxChange(day, shift)}
                                                            />
                                                        }
                                                        label={shift}
                                                    />
                                                    {shift === 'other' && editedValues.shifts[day]?.includes('other') && (
                                                        <Box sx={{ ml: 2, mt: 1 }}>
                                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                                <TextField
                                                                    label="Start Time"
                                                                    type="time"
                                                                    size="small"
                                                                    value={editedValues.otherShiftHours?.[day]?.startTime || ''}
                                                                    onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                                <TextField
                                                                    label="End Time"
                                                                    type="time"
                                                                    size="small"
                                                                    value={editedValues.otherShiftHours?.[day]?.endTime || ''}
                                                                    onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            </Box>
                                                            {timeErrors[day] && (
                                                                <Alert severity="error" sx={{ fontSize: '0.75rem', py: 0 }}>
                                                                    {timeErrors[day]}
                                                                </Alert>
                                                            )}
                                                        </Box>
                                                    )}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                    {!editingCell.includes(day) &&
                                        (editedValues.shifts[day]?.length > 0
                                            ? editedValues.shifts[day].map(shift => 
                                                shift === 'other' ? `other${formatTimeDisplay(day)}` : shift
                                              ).join(", ")
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
                    disabled={Object.values(timeErrors).some(error => error !== null)}
                >save</Button>
            </TableContainer>

        </div>
    );
}

export default Requests;

