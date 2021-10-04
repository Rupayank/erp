import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import {Manipulation} from "./util"
import {Employee,information} from "../allData";
module.exports = {
	async find(req: Request, res: Response) {
		try {
			const user=new Manipulation()
			let data = user.getData();
			res.send({
				response: data,
			});
		} catch (err:any) {
			res.status(500)
			.send({
				message: `Internal server error. ${err.message}`,
			})
		}
	},

	async findParticular(req: Request, res: Response) {
		try {
			//Get data
			const users=new Manipulation()
			let data = users.getData()
			let output = {};
			data.some((info: Employee) => {
				if (info.id == req.query.id) {
					output = info;
					return true
				}
				return false
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
			res.status(500)
			.send({
				message: `Internal server error. ${err.message}`,
			});
		}
	},
	async addDetails(req: Request, res: Response) {
		try {
			const { name, contact, email, level,managerId } = req.body;
			//Added new below
			class Head
			{				
				id:string=uuidv4();
				name:string;
				contact:number;
				email:string;
				level:string;
				constructor(name:string,contact:number,email:string,level:string)
				{
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
				managerId:string;
				constructor(name:string,contact:number,email:string,level:string,managerId:string)
				{
					super(name, contact, email, level);
					this.managerId=managerId;
				}
				
			}
			let emp
			if(level==="Manager")
			{
				emp=new Head(name, contact, email, level);
			}
			else 
			{
				emp=new Emp(name, contact, email, level,managerId);
			}

			const info:Employee=req.body;
			information.push(info);
			// console.log(info);
			//Added new above

			const users=new Manipulation()
			let data = users.getData()
			data.push(emp);

			//Save data
			users.saveData(data)

			res.send({
				status: 200,
				message:"Data saved",
				response: emp
			});
		} catch (err:any) {
			res.status(500)
			.send({
				message: `Internal server error. ${err.message}`,
			});
		}
	},
	async deleteEmp(req: Request, res: Response) {
		try {
			//Get data
			const users=new Manipulation()
			let data = users.getData()

			const filterUser = data.filter( (user:Employee) => user.id != req.query.id );

			//Save data
			users.saveData(filterUser)

			res.send({
					status: 200,
					message: "Deleted",
					response: filterUser,
				});
		} catch (err:any) {
			res.status(500)
			.send({
				message: `Internal server error. ${err.message}`,
			});
		}
	},
	async update(req: Request, res: Response) {
		try {
			//Get data
			const allUsers=new Manipulation()
			let data = allUsers.getData()

			let toUpdate = {};
			data.some((info: Employee) => {
				if (info.id == req.query.id) {
					toUpdate = info;
					return true;
				}
				return false;
			});

			data.some((user:Employee)=>{
				if(user.id==req.query.id)
				{
					Object.assign(toUpdate, req.body)	//Destructuring
					return true;
				}
				return false;
			})

			//Save data
			allUsers.saveData(data)

			res.send({
				status: 200,
				message: "Updated",
				response: toUpdate,
			});
		} catch (err) {
			res.status(500)
			.send({
				message: `Internal server error.`,
			});
		}
	},

	async findSubord(req: Request, res: Response)
	{
		try {
			//Get data
			const allUsers=new Manipulation()
			let data = allUsers.getData()
			let output:any = [];
			data.forEach((info: Employee) => {
				if (info.managerId == req.query.id) {
					output.push(info);
				}
			});
			if(output.length === 0)
			{
				res.status(404)
				.send({
					response: `No subordinate found for manager id ${req.query.id}`
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
	}
};
