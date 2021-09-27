"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
require("dotenv").config();
// import mongoose from "mongoose";
// const url = "mongodb://localhost/mydb";
var PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log("Listening at port 9000");
});
// mongoose.connect(url);
// const con = mongoose.connection;
// con.on("open", () => {
// 	console.log("Connected to db");
// });
app.use(express_1.default.json());
//Routes
var mainRoute = require("./router/mainRoute");
app.use("/home", mainRoute);
