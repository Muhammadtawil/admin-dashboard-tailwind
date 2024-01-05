export type Offices = {
    id: string;
    name: string;
    address: string;
    workDays: string[]; // An array of workdays, e.g., ["Monday", "Tuesday"]
    workStartTime: string; // A string representing the start time, e.g., "09:00 AM"
    workEndTime: string;   // A string representing the end time, e.g., "05:00 PM"
    latitude: number;      // Latitude for mapping
    longitude: number;     // Longitude for mapping
    isMainOffice : boolean;
}

