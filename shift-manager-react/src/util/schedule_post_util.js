import { API_URL } from "../constants";

// Convert UI grid { [day]: { [shift]: string[] } } to server schema (morning/middle/evening/night only)
export function toServerSchedule(grid, date = new Date()) {
    const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const shifts = ["morning","middle","evening","night"]; // ignore 'other'
    const out = { date: new Date(date), shifts: {} };
    days.forEach((day) => {
        const d = grid?.[day] || {};
        const payloadDay = {};
        shifts.forEach((s) => {
            const arr = d?.[s];
            payloadDay[s] = Array.isArray(arr) ? arr.filter((v) => typeof v === 'string' && v.trim()) : [];
        });
        out.shifts[day] = payloadDay;
    });
    return out;
}

// Create a new schedule document in the backend database
export async function createSchedule(grid, date = new Date()) {
    const payload = toServerSchedule(grid, date);
    try {
        const res = await fetch(`${API_URL}/schedule/addSchedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`Failed to create schedule: ${res.status} ${res.statusText} ${text}`);
        }
        const data = await res.json();
        // Expecting { success, message, data }
        return data?.data ?? null;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
}

