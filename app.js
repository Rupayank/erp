const express= require("express");
const app=express();
const mongoose=require("mongoose");
const url="mongodb://localhost/mydb";

mongoose.connect(url)
const con=mongoose.connection
con.on('open',()=>{
    console.log('Connected to db');
})

app.use(express.json())

//Routes
const mainRoute=require('./router/mainRoute')
app.use('/home',mainRoute)

//Listen to server
app.listen(9000,()=>{
    console.log('Listening at port 9000');
});