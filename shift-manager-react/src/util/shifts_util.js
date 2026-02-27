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

/**
 * Adds or updates a user's shifts in the database.
 * 
 * @param {Object} shiftData - The shift data object containing:
 *   - shiftId: {string} - Unique identifier (typically the user's email)
 *   - name: {string} - The user's name
 *   - shifts: {Object} - Object with keys for each day of the week (sunday, monday, tuesday, wednesday, thursday, friday, saturday)
 *                        Each key contains an array of shift preferences
 *   - userId: {string} - User's email used for database lookup
 * 
 * @returns {Promise<Object>} The saved shift data from the server
 */
export async function addShift(shiftData) {
    try {
        const response = await fetch(`${API_URL}/shifts/addShift`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shiftData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Shift added/updated:", data);
        return data.data;
    } catch (error) {
        console.error('Error adding/updating shift:', error);
        throw error;
    }
}

