import React, {useContext, createContext} from "react";
import User from "../models/User";

const mockUsers = [
    new User({ username: "alice", password: "pass123", isManager: false }),
    new User({ username: "bob", password: "adminpass", isManager: true }),
    new User({ username: "charlie", password: "charlie123", isManager: false }),
    new User({ username: "david", password: "davidpass", isManager: false }),
];


export const UserContext = createContext(mockUsers);


