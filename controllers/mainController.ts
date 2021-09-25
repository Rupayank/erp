const db = require("../models/mainModel");
// const db2 = require("../models/data");
const fs = require("fs");
import { Request, Response } from "express";
import { type } from "os";
// interface Employee {
// 	id: number;
// 	name: string;
// 	level: string;
// 	contact: number;
// 	dateOfJoining: Date;
// }
module.exports = {
	async find(req: Request, res: Response) {
		try {
			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			// const data = await db.find();
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
			// console.log(data);
			let output = {};
			data.forEach((info: any) => {
				if (info.id == req.query.id) {
					output = info;
				}
			});
			res.send({
				response: output,
			});
			// const data = await db.findById(req.query.id);
			// res.send({
			// 	status: 200,
			// 	response: data,
			// });
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
			const { name, contact, email, level } = req.body;

			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			data.push(req.body);

			//Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("data.js", stringifyData);
			// console.log(data);

			res.send({
				status: 200,
				response: data,
			});
			// const employee = new db({
			// 	name,
			// 	contact,
			// 	email,
			// 	level,
			// });
			// const emp = await employee.save();
			// res.send({
			// 	status: 200,
			// 	response: emp,
			// });
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
			// const del = await db.deleteOne({ _id: req.query.id });
			// res.send({
			// 	status: 200,
			// 	message: "Deleted",
			// 	response: del,
			// });
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
			// console.log(user);

			//Save data
			const stringifyData = JSON.stringify(user);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				message: "Updated",
				response: user,
			});
			// const data = await db.findByIdAndUpdate(req.query.id, req.body, {
			// 	new: true,
			// });
			// // data.email=req.body.email
			// const result = await data.save();
			// res.send({
			// 	status: 200,
			// 	message: "Updated",
			// 	response: result,
			// });
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
