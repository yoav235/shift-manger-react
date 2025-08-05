import React, {useEffect, useState} from "react";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
} from "@mui/material";
import {daysArray, shiftsArray} from "../../constants";
import Scheduler from "../../models/Scheduler";
import {fetchSchedule} from "../../util/schedule_util";



function Schedule() {
    const [scheduler, setScheduler] = useState(new Scheduler("", {
        sunday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        monday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        tuesday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        wednesday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        thursday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        friday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        },
        saturday: {
            morning: [],
            middle: [],
            evening: [],
            night: []
        }
    }));

    useEffect(() => {
        const fetchData = async () => {
            const fetchedSchedule = await fetchSchedule();
            const scheduleData = new Scheduler(fetchedSchedule.date, fetchedSchedule.shifts);
            setScheduler(scheduleData);
        };
        fetchData().then(() => {console.log("Schedule shifts: ", scheduler);});
    }, [scheduler]);




    return (
        <div>
            <h1>Schedule</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {daysArray.map((day, i) => (
                                <TableCell key={i}>{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shiftsArray.map((shift, i) => (
                            <TableRow key={i}>
                                <TableCell>{shift}</TableCell>
                                {daysArray.map((day, j) => (
                                    <TableCell key={j}>
                                        {scheduler.schedule[day]?.[shift]?.join(", ") || ""}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Schedule;