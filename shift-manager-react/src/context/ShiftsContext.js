import React, {createContext} from "react";
import Shifts from "../models/Shifts";


const mockShifts = [
    new Shifts({
        userId: "alice",
        shifts: {
            monday: ["morning"],
            wednesday: ["evening"],
            friday: ["night"]
        }
    }),
    new Shifts({
        userId: "bob",
        shifts: {
            tuesday: ["morning", "night"],
            thursday: ["middle"],
            saturday: ["evening"]
        }
    }),
    new Shifts({
        userId: "charlie",
        shifts: {
            sunday: ["night"],
            wednesday: ["morning"],
            friday: ["afternoon"]
        }
    }),
    new Shifts({
        userId: "david",
        shifts: {
            monday: ["middle", "evening"],
            saturday: ["morning"]
        }
    })
];

export const ShiftsContext = createContext(mockShifts);
