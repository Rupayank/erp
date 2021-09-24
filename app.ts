import express from "express";
const app = express();
require("dotenv").config();
import mongoose from "mongoose";
const url = "mongodb://localhost/mydb";

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log("Listening at port 9000");
});

mongoose.connect(url);
const con = mongoose.connection;
con.on("open", () => {
	console.log("Connected to db");
});

app.use(express.json());

//Routes
const mainRoute = require("./router/mainRoute");
app.use("/home", mainRoute);
