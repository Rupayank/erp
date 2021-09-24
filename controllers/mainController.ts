const db = require("../models/mainModel");
import { Request, Response } from "express";
module.exports = {
	async find(req: Request, res: Response) {
		try {
			const data = await db.find();
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
			const data = await db.findById(req.query.id);
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

	async addDetails(req: Request, res: Response) {
		try {
			const { name, contact, email, level } = req.body;
			const employee = new db({
				name,
				contact,
				email,
				level,
			});
			const emp = await employee.save();
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
			const del = await db.deleteOne({ _id: req.query.id });
			res.send({
				status: 200,
				message: "Deleted",
				response: del,
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
			const data = await db.findByIdAndUpdate(req.query.id, req.body, {
				new: true,
			});
			// data.email=req.body.email
			const result = await data.save();
			res.send({
				status: 200,
				message: "Updated",
				response: result,
			});
		} catch (err) {
			res.send({
				status: 502,
				message: `Internal server error.`,
				response: null,
			});
		}
	},
};
