const fs = require("fs");
import { Request, Response } from "express";
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
			const { name, contact, email, level } = req.body;

			let data = fs.readFileSync("data.js");
			data = JSON.parse(data);
			data.push(req.body);

			//Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("data.js", stringifyData);

			res.send({
				status: 200,
				response: data,
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
