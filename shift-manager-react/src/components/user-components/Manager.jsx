import React, {useContext, useEffect, useMemo, useState} from "react";
import {fetchAllShifts} from "../../util/shifts_util";
import {fetchSchedule} from "../../util/schedule_util";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Menu, MenuItem, Typography, Box, Chip
} from "@mui/material";
import { daysArray, shiftsArray } from "../../constants";

async function shiftsDictionary(){
    const shiftsDict = {};
    const shifts = await fetchAllShifts();
    shifts.forEach(shift => {
        shiftsDict[shift.name] = shift;
    });
    return shiftsDict;
}

function Manager() {
    const [schedule, setSchedule] = useState([]);
    const [shiftsDict, setShiftsDict] = useState({});
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [activeCell, setActiveCell] = useState(null);

    useEffect(() => {
        async function loadData() {
            const dict = await shiftsDictionary();
            setShiftsDict(dict);

            const sched = await fetchSchedule();
            setSchedule(Array.isArray(sched) ? sched : []); // ensure it's an array
        }
        loadData();
    }, []);

    const allUsers = useMemo(() => {
        const fromDict = Object.keys(shiftsDict || {});
        const fromSchedule = new Set();
        (schedule || []).forEach((d) => {
            if (d?.shifts) {
                Object.values(d.shifts).forEach((arr) => {
                    (arr || []).forEach((u) => fromSchedule.add(u));
                });
            }
        });
        return Array.from(new Set([...(fromDict || []), ...Array.from(fromSchedule)])).sort();
    }, [shiftsDict, schedule]);


    const handleCellClick = (event, day, shift) => {
        setActiveCell({ day, shift });
        setMenuAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchor(null);
        setActiveCell(null);
    };


    const ensureDayRow = (day) => {
        let idx = schedule.findIndex((d) => d.day === day);
        if (idx === -1) {
            const newRow = { day, shifts: {} };
            setSchedule((prev) => [...prev, newRow]);
            return schedule.length; // המיקום שהתווסף יהיה בסוף
        }
        return idx;
    };

    const assignUserToCell = (username) => {
        if (!activeCell) return;
        const { day, shift } = activeCell;

        const next = [...schedule];
        let idx = next.findIndex((d) => d.day === day);
        if (idx === -1) {
            idx = ensureDayRow(day); // דואג שתהיה שורת יום
        }
        const row = next[idx] || { day, shifts: {} };
        const cur = Array.isArray(row.shifts?.[shift]) ? [...row.shifts[shift]] : [];
        if (!cur.includes(username)) cur.push(username);
        row.shifts = { ...(row.shifts || {}), [shift]: cur };
        next[idx] = row;

        setSchedule(next);
        closeMenu();
    };

    const cellNames = (day, shift) => {
        const row = schedule.find((d) => d.day === day);
        const names = row?.shifts?.[shift] || [];
        return names;
    };


    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Manager</Typography>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {daysArray.map((day) => (
                                <TableCell key={day} align="center">{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {shiftsArray.length ? shiftsArray : ["בוקר", "מידל", "ערב", "לילה", "אחר"]}.map
                        { (shift) => (
                            <TableRow key={shift} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{shift}</TableCell>
                                {daysArray.map((day) => {
                                    const names = cellNames(day, shift);
                                    return (
                                        <TableCell
                                            key={`${day}-${shift}`}
                                            onClick={(e) => handleCellClick(e, day, shift)}
                                            sx={{ cursor: "pointer", minWidth: 160 }}
                                        >
                                            {names.length ? (
                                                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                                    {names.map((n) => <Chip key={n} label={n} size="small" />)}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    + הוסף עובד
                                                </Typography>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                {allUsers.length === 0 && (
                    <MenuItem disabled>אין משתמשים להצגה</MenuItem>
                )}
                {allUsers.map((u) => (
                    <MenuItem key={u} onClick={() => assignUserToCell(u)}>
                        {u}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default Manager;

