import React, {useEffect, useMemo, useState} from "react";
import {fetchAllShifts} from "../../util/shifts_util";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Typography, Box, Chip
} from "@mui/material";
import { daysArray } from "../../constants";
import dayjs from 'dayjs';

// Helper function to format shift name with custom hours for "other" shift
function formatShiftWithHours(shift, workerData, day) {
    if (shift !== 'other' || !workerData?.otherShiftHours?.[day]) {
        return shift;
    }
    
    const hours = workerData.otherShiftHours[day];
    if (!hours?.startTime || !hours?.endTime) {
        return shift;
    }
    
    const startTime = dayjs(hours.startTime).format('h:mm A');
    const endTime = dayjs(hours.endTime).format('h:mm A');
    return `${shift} (${startTime}-${endTime})`;
}

async function shiftsDictionary(){
    const shiftsDict = {};
    const shifts = await fetchAllShifts();
    if (!Array.isArray(shifts)) return shiftsDict;
    shifts.forEach(shift => {
        if (shift?.name) {
            shiftsDict[shift.name] = shift;
        }
    });
    return shiftsDict;
}

function Manager() {
    const [shiftsDict, setShiftsDict] = useState({});

    useEffect(() => {
        async function loadData() {
            const dict = await shiftsDictionary();
            setShiftsDict(dict);
        }
        loadData();
    }, []);

    const workerNames = useMemo(() => {
        return Object.keys(shiftsDict || {}).sort();
    }, [shiftsDict]);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Workers Requests</Typography>
            </Box>
            

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Worker</TableCell>
                            {daysArray.map((day) => (
                                <TableCell key={day} align="center" sx={{ textTransform: "capitalize", fontWeight: 700 }}>
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {workerNames.map((name) => (
                            <TableRow key={name} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{name}</TableCell>
                                {daysArray.map((day) => {
                                    const raw = shiftsDict?.[name]?.shifts?.[day];
                                    const list = Array.isArray(raw) ? raw : [];
                                    return (
                                        <TableCell key={`${name}-${day}`} align="center" sx={{ minWidth: 160 }}>
                                            {list.length ? (
                                                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                                                    {list.map((shift) => {
                                                        const workerData = shiftsDict[name];
                                                        const displayShift = formatShiftWithHours(shift, workerData, day);
                                                        return (
                                                            <Chip key={`${name}-${day}-${shift}`} label={displayShift} size="small" />
                                                        );
                                                    })}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">—</Typography>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {!workerNames.length && (
                            <TableRow>
                                <TableCell colSpan={1 + daysArray.length} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No workers found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Manager;
