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
					return true
				}
			});
			if(Object.keys(output).length === 0)
			{
				res.status(404)
				.send({
					response: `No data found for id ${req.query.id}`
				});
			}
			else
			{
				res.send({
					response: output
				});
			}
			
		} catch (err: any) {
			res.status(502)
			.send({
				message: `Internal server error. ${err.message}`,
			});
		}
	},
	async addDetails(req: Request, res: Response) {
		try {
			const { id,name, contact, email, level,dateOfJoining } = req.body;
			//Added new below
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
			// console.log(info);
			//Added new above

			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			data.push(emp);

			//Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				response: emp,
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

			let toUpdate = {};
			data.forEach((info: any) => {
				if (info.id == req.query.id) {
					toUpdate = info;
					return true
				}
			});

			const user = data.filter((user: any) => user.id != req.query.id);
			Object.assign(toUpdate, req.body);
			user.push(toUpdate);

			//Save data
			const stringifyData = JSON.stringify(user);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				message: "Updated",
				response: toUpdate,
			});
		} catch (err) {
			// console.log(err);
			res.send({
				status: 502,
				message: `Internal server error.`,
				response: null,
			});
		}
	},
};
