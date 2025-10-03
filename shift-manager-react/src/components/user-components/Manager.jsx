import React, {useContext, useEffect, useState} from "react";
import {fetchAllShifts} from "../../util/shifts_util";
import {fetchSchedule} from "../../util/schedule_util";

function shiftsDictionary(){
    const shiftsDict = {};
    const shifts = fetchAllShifts();
    shifts.forEach(shift => {
        shiftsDict[shift.name] = shift;
    });
    return shiftsDict;
}

function Manager() {
    const [schedule, setSchedule] = useState([]);
    const [shiftsDict, setShiftsDict] = useState({});
    const [dropdownData, setDropdownData] = useState({ visible: false, x: 0, y: 0, users: [] });

    useEffect(() => {
        setShiftsDict(shiftsDictionary());
        fetchSchedule().then(data => setSchedule(data));
    }, []);



    return(
        <div>
            <h1>Manager</h1>
        </div>
    )
}

export default Manager;