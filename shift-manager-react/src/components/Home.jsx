import React from "react";
import Requests from "./user-components/Requests";



function Home({user, shifts, onShiftChange}) {


    const handleReqSave = (shifts) => {
        console.log(shifts);
        alert("Saved");
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Hello {user?.name || ""}, welcome back!</h1>
            <Requests shifts={shifts} onShiftChange={onShiftChange} onSave={handleReqSave}></Requests>
        </div>
    );
}

export default Home;