import React, {useEffect, useMemo, useState} from "react";
import {fetchAllShifts} from "../../util/shifts_util";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Typography, Box, Chip
} from "@mui/material";
import { daysArray } from "../../constants";

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
            <Typography variant="h4" sx={{ mb: 2 }}>Manager</Typography>

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
                                                    {list.map((shift) => (
                                                        <Chip key={`${name}-${day}-${shift}`} label={shift} size="small" />
                                                    ))}
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
