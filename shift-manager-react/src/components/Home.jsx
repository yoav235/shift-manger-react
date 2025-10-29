import React, {useContext, useEffect, useState} from "react";
import Requests from "./user-components/Requests";
import Schdeule from "./user-components/Schdeule";
import Manager from "./user-components/Manager";
import ScheduleMaker from "./user-components/ScheduleMaker";
import { AppBar, Tabs, Tab, Button, Box } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {loginPath, schedule, updateSchedule} from "../constants";
import {ShiftsContext, UserContext} from "../App";
import Cookies from 'js-cookie';
import { addShift } from "../util/shifts_util";
import fetchShifts from "../util/shifts_util";
import Shifts from "../models/Shifts";



function Home() {
    const {shifts, setShifts} = useContext(ShiftsContext);
    const {user, setUser} = useContext(UserContext);
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            const cookieUser = Cookies.get("user");
            const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;
            if (cookieUser) {
                setUser(parsedUser);
            } else {
                navigate(loginPath);
            }
        }
        if (!shifts) {
            const cookieShifts = Cookies.get("shifts");
            const parsedShifts = cookieShifts ? JSON.parse(cookieShifts)[0] : null;
            if (parsedShifts) {
                setShifts(parsedShifts);
            }
        }
        console.log("Home shifts: ", shifts);
        console.log("Home user: ", user);
    }, [user, shifts]);

    const handleReqSave = async (shifts) => {
        try {
            console.log("saved shifts: ", shifts);
            
            // Transform shifts data to match backend schema
            const shiftData = {
                shiftId: shifts.userId,  // Unique identifier (userId is the shiftId in Shifts model)
                name: shifts.name,       // User's name
                shifts: shifts.shifts,   // Shifts object with day arrays
                userId: shifts.userId    // Used by backend for database lookup
            };
            
            // Save to database
            await addShift(shiftData);
            
            // Reload shifts from database to get the latest data
            console.log("Reloading shifts from database after save...");
            const fetchedShifts = await fetchShifts(shifts.userId);
            
            if (fetchedShifts && fetchedShifts[0]) {
                const updatedShifts = new Shifts({
                    shiftId: fetchedShifts[0].shiftId,
                    name: fetchedShifts[0].name,
                    shifts: fetchedShifts[0].shifts
                });
                // Update context with fresh data from database
                setShifts(updatedShifts);
                // Update cookies
                Cookies.set('shifts', JSON.stringify(fetchedShifts), { expires: 1 });
                console.log("Shifts reloaded from database:", updatedShifts);
            } else {
                // Fallback to local state if fetch fails
                alert("Failed to reload shifts from database");
                setShifts(shifts);
            }
            
            // updateSchedule(schedule, shifts);
            
            alert("Shifts saved successfully!");
        } catch (error) {
            console.error("Failed to save shifts:", error);
            alert("Failed to save shifts. Please try again.");
        }
    }

    const handleLogout = () => {
        alert("Logged out");
        Cookies.remove("user");
        Cookies.remove("shifts");
        navigate(loginPath);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
                    {user?.isManager ? (
                        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} textColor="inherit">
                            <Tab label="Requests" />
                            <Tab label="Schedule Maker" />
                        </Tabs>
                    ) : (
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
                {(!user || !shifts) ? (
                    <h2>Loading...</h2>
                ) : (
                    <>
                        <h2>Hello {shifts?.name || ""}, welcome back!</h2>
                        {user?.isManager ? (
                            <>
                                {tabIndex === 0 && <Manager />}
                                {tabIndex === 1 && (
                                    <Box sx={{ mt: 2 }}>
                                        <ScheduleMaker />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <>
                                {tabIndex === 0 && <Requests onShiftChange={() => {}} onSave={handleReqSave} />}
                                {tabIndex === 1 && <Schdeule />}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Home;