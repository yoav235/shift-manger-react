import {API_URL} from "../constants";



export default async function fetchShifts(shiftId) {
    try {
        const response = await fetch(`${API_URL}/shifts/getShifts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: shiftId})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Fetched shifts:", data);
        return data.data; // Assuming the shifts are in the 'data' field of the response
    } catch (e) {
        console.error('Error fetching shifts:', e);
        return undefined;
    }
}

export async function fetchAllShifts() {
    try {
        const response = await fetch(`${API_URL}/shifts/getAllShifts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching shifts:', error);
        return undefined;
    }
}