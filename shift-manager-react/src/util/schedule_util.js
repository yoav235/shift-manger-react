import {API_URL} from "../constants";


export async function fetchSchedule() {
    try {
        const response = await fetch(`${API_URL}/schedule/getCurrentSchedules`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("current schedule: ", data)
        return data.data;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return undefined;
    }
}