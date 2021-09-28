import express from "express";
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log("Listening at port 9000");
});

app.use(express.json());

//Routes
const mainRoute = require("./router/mainRoute");
app.use("/home", mainRoute);