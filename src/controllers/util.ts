const fs = require("fs");
export class Manipulation
{
	getData():any{
		let data = fs.readFileSync("data.js");
		return JSON.parse(data);
	}
	saveData(data:any):void
	{
		const stringifyData = JSON.stringify(data);
		fs.writeFileSync("data.js", stringifyData);
	}
}
