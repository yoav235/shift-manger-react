import User from "./models/User";
import Shifts from "./models/Shifts";

const homePath = "/home";
const loginPath = "/";
const signupPath = "/signup";
const API_URL = "https://shift-manager-backend-y3kz.onrender.com/api"



const mockShifts = [
    new Shifts({
        userId: "alice",
        shifts: {
            sunday: [],
            monday: ["morning"],
            tuesday: [],
            wednesday: ["evening"],
            thursday: [],
            friday: ["night"],
            saturday: []
        }
    }),
    new Shifts({
        userId: "bob",
        shifts: {
            sunday: [],
            monday: [],
            tuesday: ["morning", "night"],
            wednesday: [],
            thursday: ["middle"],
            friday: [],
            saturday: ["evening"]
        }
    }),
    new Shifts({
        userId: "charlie",
        shifts: {
            sunday: ["night"],
            monday: [],
            tuesday: [],
            wednesday: ["morning"],
            thursday: [],
            friday: ["afternoon"],
            saturday: []
        }
    }),
    new Shifts({
        userId: "david",
        shifts: {
            sunday: [],
            monday: ["middle", "evening"],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: ["morning"]
        }
    })
];

const schedule = [
    { day: "sunday", shifts: { morning: ["alice"], middle: ["bob"], evening: ["charlie"], night: ["david"], other: [] } },
    { day: "monday", shifts: { morning: ["bob"], middle: ["david"], evening: ["alice"], night: ["charlie"], other: [] } },
    { day: "tuesday", shifts: { morning: ["charlie"], middle: ["alice"], evening: ["david"], night: ["bob"], other: [] } },
    { day: "wednesday", shifts: { morning: ["david"], middle: ["charlie"], evening: ["bob"], night: ["alice"], other: [] } },
    { day: "thursday", shifts: { morning: ["alice"], middle: ["bob"], evening: ["charlie"], night: ["david"], other: [] } },
    { day: "friday", shifts: { morning: ["bob"], middle: ["david"], evening: ["alice"], night: ["charlie"], other: [] } },
    { day: "saturday", shifts: { morning: ["charlie"], middle: ["alice"], evening: ["david"], night: ["bob"], other: [] } }
];

const daysArray = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const shiftsArray = ["morning", "middle", "evening", "night", "other"];

const updateSchedule = (schedule, worker) => {
    schedule.map((workDay) => {
        worker.shifts.shifts[workDay.day].map((shift) => {
            if(!(workDay.shifts[shift]?.includes(worker.userId))) {
                workDay.shifts[shift]?.push(worker.userId);
            }
        })
    })
}

export { homePath, loginPath, signupPath, mockShifts, daysArray, shiftsArray, schedule, updateSchedule, API_URL};