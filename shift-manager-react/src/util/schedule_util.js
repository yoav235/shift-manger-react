import { API_URL } from "../constants";

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

export function toServerSchedule(grid, date = new Date()) {
    const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const shifts = ["morning","middle","evening","night"];
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
        return data?.data ?? null;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
}