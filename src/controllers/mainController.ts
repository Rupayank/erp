import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import {Database} from "./util"
import {Employee} from "../allData";
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
	// function validateEmail(mail) 
	// {
	// 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) )return true
	// 	return false
	// };

	// function validateContact(inputtxt)
	// {
	// 	var phoneno = /^\d{10}$/;
	// 	console.log(inputtxt);
	// 	if(inputtxt.match(phoneno))return true;
	// 	else return false;
	// };
	async addDetails(req: Request, res: Response) {
		try {
			const { name, contact, email, level,managerId } = req.body;
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
				validateEmail(mail:string):boolean 
				{
					if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) )return true
					return false
				};
				validateContact(input:number):boolean
				{
					var phoneno = /^\d{10}$/;
					let contact=input.toString();
					if(contact.match(phoneno))return true;
					else return false;
				};
				validateLevel(level:string):boolean
				{
					let arr=['Developer','Tester','Intern','Manager','Programmer']
					let test=arr.findIndex(type=>type===level)
					if(test>=0)return true;
					return false;
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

			//Validation
			let valContact:boolean=emp.validateContact(contact);
			let valEmail:boolean=emp.validateEmail(email);
			let valLevel:boolean=emp.validateLevel(level);

			if(valContact && valEmail && valLevel)
			{
				const users=new Database()
				let data = users.getData()
				data.push(emp);
	
				users.saveData(data)
				
				res.send({
					message:"Data saved",
					response: emp
				});
			}
			else
			{
				let msg=''
				if(!valContact)msg+="Invalid contact number ";
				if(!valEmail)msg+="Invalid email id ";
				if(!valLevel)msg+="Invalid employee level ";
				msg+="."
				res.status(400)
				.send({
					message:msg,
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
						response: filterUser,
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
	
				//Save data
				allUsers.saveData(data)
	
				res.send({
					status: 200,
					message: "Updated",
					response: data[index],
				});
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
