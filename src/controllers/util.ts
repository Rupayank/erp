import * as fs from "fs"
interface Employee {
    id: string;
    name: string;
    contact: number;
	email:string;
    level: string;
	managerId?:string;
	supervisor?:string;
}
export class Database
{
	getData():Promise<Employee[]>{
		// let data = fs.readFileSync("data.js");
		// return JSON.parse(data);
		return new Promise(resolve => {
			   fs.readFile('data.js', "utf-8",function read(err:any, data:any)  {
					   if (err) {
						   throw err;
					   }
					  resolve( JSON.parse(data))
					} );
				   });
	}
	saveData(data:Employee[]):Promise<void>
	{
		return new Promise(resolve=>{
			const stringifyData = JSON.stringify(data);
			resolve(
			fs.writeFile('data.js',stringifyData, function(err:any){
				if(err){
					throw err;
				}
			}))
		})
	}
}
