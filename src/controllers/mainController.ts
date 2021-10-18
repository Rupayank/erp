import { Request, Response } from "express";
import {Database} from "./util"
import {Employee,Head,Emp} from "../model/allData";

module.exports = {
	async find(req: Request, res: Response) {
		try {
			const db=new Database()
			let data = db.getData();
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
			const db=new Database()
			let data = db.getData()
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
	
			let emp

			const users=new Database()
			let data = users.getData()

			if(level==="Manager")
			{
				emp=new Head(name, contact, email, level);
			}
			else 
			{
				if(managerId)
				{
					const idx=data.findIndex(user=>user.id===managerId)
					if(idx>=0)emp=new Emp(name, contact, email, level,managerId);
					else
					{
						return res.status(404)
						.send({
							message:"No manager with given id"
						})
					}
				}
				else
				{
					return res.status(400)
					.send({
						message:"ManagerId is not provided"
					})
				}
			}

			//Validation
			if(emp.validate(contact,email,level))
			{
				data.push(emp);
	
				users.saveData(data)
				
				res.send({
					message:"Data saved",
					response: emp
				});
			}
			else
			{
				res.status(400)
				.send({
					message:"Invalid details",
				});
			}
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
			const users=new Database()
			let data = users.getData()

			const filterUser = data.filter( (user:Employee) => user.id != req.query.id );
			if(data.length==filterUser.length)
			{
				res.status(404)
				.send({
					message: `No user with id: ${req.query.id} found.`,
				});
			}
			else
			{
				//Save data
				users.saveData(filterUser)
	
				res.send({
						status: 200,
						message: "Deleted",
					});
			}
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
			const allUsers=new Database()
			let data = allUsers.getData()

			const index=data.findIndex((user=>user.id==req.query.id))
			if(index===-1)
			{
				res.status(404)
				.send({
					message: `No user with id: ${req.query.id} found.`,
				});
			}
			else
			{
				data[index]={...data[index],...req.body}

				const {name,email,contact,level,managerId}=data[index]

				let emp
				if(level==='Manager')
				{
					emp=new Head(name, contact, email, level);
				}
				else
				{
					if(managerId)
					{
						const idx=data.findIndex(user=>user.id===managerId)
						if(idx>=0)emp=new Emp(name, contact, email, level,managerId);
						else
						{
							return res.status(404)
							.send({
								message:"No manager with given id"
							})
						}
					}
					else
					{
						return res.status(400)
						.send({
							message:"ManagerId is not provided"
						})
					}
				}
				if(emp.validate(contact,email,level))
				{
					//Save data
					allUsers.saveData(data)
		
					res.send({
						message: "Updated",
						response: data[index],
					});
				}
				else
				{
					res.status(400)
					.send({
						message:"Invalid details"
					})
				}
			}
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
			const allUsers=new Database()
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
