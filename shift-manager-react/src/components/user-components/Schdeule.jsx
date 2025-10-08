import React, {useEffect, useState} from "react";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    CircularProgress,
    TableRow,
    Paper,
    Table,
    Box
} from "@mui/material";
import {daysArray, shiftsArray} from "../../constants";
import Scheduler from "../../models/Scheduler";
import {fetchSchedule} from "../../util/schedule_util";



function normalizeSchedule(raw) {
    // Expecting shape: { date, shifts: { [day]: { [shift]: string[] } } }
    const empty = new Scheduler().schedule;
    const safe = (raw && typeof raw === 'object' ? raw : {});
    const schedule = (safe.shifts && typeof safe.shifts === 'object') ? safe.shifts : {};
    const out = {};
    daysArray.forEach(day => {
        const d = schedule[day] || {};
        out[day] = {};
        shiftsArray.forEach(shift => {
            const val = d[shift];
            out[day][shift] = Array.isArray(val) ? val : [];
        });
    });
    return new Scheduler(safe.date || new Date(), out);
}

function Schedule() {
    const [scheduler, setScheduler] = useState(new Scheduler());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = await fetchSchedule();
                const normalized = normalizeSchedule(fetched);
                setScheduler(normalized);
            } catch (e) {
                // keep default empty schedule
                console.error("Failed to fetch schedule", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <div>
            <h1>Schedule</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {daysArray.map((day) => (
                                <TableCell key={day}>{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shiftsArray.map((shift) => (
                            <TableRow key={shift}>
                                <TableCell>{shift}</TableCell>
                                {daysArray.map((day) => {
                                    const users = scheduler?.schedule?.[day]?.[shift];
                                    const list = Array.isArray(users) ? users : [];
                                    return (
                                        <TableCell key={`${day}-${shift}`}>
                                            {list.join(", ")}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Schedule;