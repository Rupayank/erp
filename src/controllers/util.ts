const fs = require("fs");
interface Employee {
    id: string;
    name: string;
    contact: number;
	email:string;
    level: string;
	managerId?:string;
	supervisor?:string;
}
export class Manipulation
{
	getData():Employee[]{
		let data = fs.readFileSync("data.js");
		return JSON.parse(data);
	}
	saveData(data:Employee[]):void
	{
		const stringifyData = JSON.stringify(data);
		fs.writeFileSync("data.js", stringifyData);
	}
}
