import mongoose from "mongoose";

const employee = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	contact: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	level: {
		type: String,
		required: true,
	},
	dateOfJoining: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("employee", employee);
