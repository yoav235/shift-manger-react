import {API_URL} from "../constants";




export default async function loginUser(user) {
    try {
        const response = await fetch(API_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user.username, password: user.password} )
        });
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const shiftId = data.data;  // Extracting shiftId
        console.log("Login successful. Shift ID:", shiftId);
        return shiftId;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return undefined;
    }
}