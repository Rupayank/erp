const fs = require("fs");
import { Request, Response } from "express";

import {Employee,information} from "../allData";
module.exports = {
	async find(req: Request, res: Response) {
		try {
			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			res.send({
				response: data,
			});
		} catch (err) {
			console.log(err);
			res.send({
				status: 502,
				response: null,
			});
		}
	},

	async findParticular(req: Request, res: Response) {
		try {
			//Get data
			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			let output = {};
			data.forEach((info: any) => {
				if (info.id == req.query.id) {
					output = info;
				}
			});
			res.send({
				response: output,
			});
			
		} catch (err: any) {
			res.send({
				status: 502,
				message: `Internal server error. ${err.message}`,
				response: null,
			});
		}
	},
	async addDetails(req: Request, res: Response) {
		try {
			const { id,name, contact, email, level,dateOfJoining } = req.body;
			//Added new below
			// interface Employee {
			// 	id: number;
			// 	name: string;
			// 	level: string;
			// 	contact: number;
			// 	dateOfJoining: Date;
			// }
			class Head
			{				
				id:number;
				name:string;
				contact:number;
				email:string;
				level:string;
				constructor(id:number,name:string,contact:number,email:string,level:string)
				{
					this.id=id;
					this.name=name;
					this.level=level;
					this.contact=contact;
					this.email=email
				}
				jsonOut():any{
					let obj={
						id:this.id,
						name:this.name,
						contact:this.contact,
						email:this.email,
						level:this.level
					}
					return obj
				}
			}
			class Emp extends Head
			{
				readonly supervisor:string="Manager";
				constructor(id:number,name:string,contact:number,email:string,level:string)
				{
					super(id,name, contact, email, level);
				}
				
			}
			let emp
			if(level==="Manager")
			{
				emp=new Head(id,name, contact, email, level);
			}
			else 
			{
				emp=new Emp(id,name, contact, email, level);
			}

			const info:Employee=req.body;
			information.push(info);
			console.log(emp);
			//Added new above

			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			data.push(req.body);

			//Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				response: req.body,
			});
		} catch (err) {
			res.send({
				status: 502,
				message: `Internal server error.`,
				response: null,
			});
		}
	},
	async deleteEmp(req: Request, res: Response) {
		try {
			//Get data
			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);

			const filterUser = data.filter( (user:any) => user.id != req.query.id );

			//Save data
			const stringifyData = JSON.stringify(filterUser);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
					status: 200,
					message: "Deleted",
					response: filterUser,
				});
		} catch (err) {
			res.send({
				status: 502,
				message: `Internal server error.`,
				response: null,
			});
		}
	},
	async update(req: Request, res: Response) {
		try {
			//Get data
			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);

			const user = data.filter((user: any) => user.id != req.query.id);
			user.push(req.body);

			//Save data
			const stringifyData = JSON.stringify(user);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				message: "Updated",
				response: user,
			});
		} catch (err) {
			console.log(err);
			res.send({
				status: 502,
				message: `Internal server error.`,
				response: null,
			});
		}
	},
};
