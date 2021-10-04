export interface Employee {
    id: number;
    name: string;
    level: string;
    contact: number;
    dateOfJoining: Date;
}


 export let information: Employee[] = [
        {
            id: 1,
            name:"RK",
            level:"Manger",
            contact:112233,
            dateOfJoining:new Date("2019-01-16")
        }
    ];