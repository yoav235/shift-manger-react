import User from "./models/User";
import Shifts from "./models/Shifts";

const homePath = "/home";
const loginPath = "/";
const signupPath = "/signup";


const mockUsers = [
    new User({ username: "alice", password: "pass123", isManager: false }),
    new User({ username: "bob", password: "adminpass", isManager: true }),
    new User({ username: "charlie", password: "charlie123", isManager: false }),
    new User({ username: "david", password: "davidpass", isManager: false }),
];

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
    { day: "Sunday", shifts: { morning: ["alice"], middle: ["bob"], evening: ["charlie"], night: ["david"], other: [] } },
    { day: "Monday", shifts: { morning: ["bob"], middle: ["david"], evening: ["alice"], night: ["charlie"], other: [] } },
    { day: "Tuesday", shifts: { morning: ["charlie"], middle: ["alice"], evening: ["david"], night: ["bob"], other: [] } },
    { day: "Wednesday", shifts: { morning: ["david"], middle: ["charlie"], evening: ["bob"], night: ["alice"], other: [] } },
    { day: "Thursday", shifts: { morning: ["alice"], middle: ["bob"], evening: ["charlie"], night: ["david"], other: [] } },
    { day: "Friday", shifts: { morning: ["bob"], middle: ["david"], evening: ["alice"], night: ["charlie"], other: [] } },
    { day: "Saturday", shifts: { morning: ["charlie"], middle: ["alice"], evening: ["david"], night: ["bob"], other: [] } }
];

const daysArray = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shiftsArray = ["morning", "middle", "evening", "night", "other"];



export { homePath, loginPath, signupPath, mockShifts, mockUsers, daysArray, shiftsArray, schedule};