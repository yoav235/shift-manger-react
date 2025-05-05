import {API_URI} from "../constants";



export async function addUser(user){
    try {
        const response = await fetch(`${API_URI}/api/users/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    }
    catch (error) {
        console.error('Error adding user:', error);
    }
}