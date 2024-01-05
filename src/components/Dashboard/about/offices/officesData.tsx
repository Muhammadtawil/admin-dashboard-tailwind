import { Offices } from "@/types/offices";

const OfficesData: Offices[] = [
    {
        id: "1",
        name: "Beirut",
        address: "beirut,DownTown Azarieh Building 2nd floor",
        workDays: ['Monday','Tuesday'], 
        workStartTime: '9AM', 
        workEndTime: '4PM', 
        latitude: 35824155,
        longitude: 331566561,
        isMainOffice: true,
    
    },
    {
        id: "2",
        name: "Hazmieh",
        address: "beirut,DownTown Azarieh Building 2nd floor",
        workDays: ['Wednesday'], 
        workStartTime: '9AM', 
        workEndTime: '4PM', 
        latitude: 35824155,
        longitude: 331566561,
        isMainOffice:false,
   
    },
    {
        id: "1",
        name: "Chtoura",
        address: "Chtoura,DownTown Azarieh Building 2nd floor",
        workDays: ['Thursday','Saturday','Friday'], 
        workStartTime: '9AM', 
        workEndTime: '4PM',
        latitude: 35824155,
        longitude: 331566561,
        isMainOffice:false,
    
    },
]

export default OfficesData;