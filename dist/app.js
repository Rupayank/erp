"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
require("dotenv").config();
var mainRoute = require("./router/mainRoute");
var PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log("Listening at port 9000");
});
app.use(express_1.default.json());
//Routes
app.use("/home", mainRoute);
