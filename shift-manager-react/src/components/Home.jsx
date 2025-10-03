import React, {useContext, useEffect, useState} from "react";
import Requests from "./user-components/Requests";
import Schdeule from "./user-components/Schdeule";
import Manager from "./Manager";
import { AppBar, Tabs, Tab, Button, Box } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {loginPath, schedule, updateSchedule} from "../constants";
import {ShiftsContext, UserContext} from "../App";


function Home() {
    const {shifts, setShifts} = useContext(ShiftsContext);
    const {user} = useContext(UserContext);
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Home shifts: ", shifts);
        console.log("Home user: ", user);
    }, [user, shifts]);

    const handleReqSave = (shifts) => {
        console.log("saved shifts: ", shifts);
        alert("Saved: " + shifts);
        setShifts(shifts);
        updateSchedule(schedule, shifts);
    }

    const handleLogout = () => {
        alert("Logged out");
        navigate(loginPath);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
                    {!user?.isManager && (
                        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} textColor="inherit">
                            <Tab label="Requests" />
                            <Tab label="Schedule" />
                        </Tabs>
                    )}
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <h2>Hello {user?.username || ""}, welcome back!</h2>
                {user?.isManager ? (
                    <Manager />
                ) : (
                    <>
                        {tabIndex === 0 && <Requests onShiftChange={() => {}} onSave={handleReqSave} />}
                        {tabIndex === 1 && <Schdeule />}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Home;