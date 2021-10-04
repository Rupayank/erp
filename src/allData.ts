export interface Employee {
    id: string;
    name: string;
    contact: number;
	email:string;
    level: string;
	managerId?:string;
	supervisor?:string;
}


 export let information: Employee[] = [
        {
            id: "1",
            name:"RK",
            level:"Manger",
            contact:112233,
            email:"kkr@g.com"
        }
    ];