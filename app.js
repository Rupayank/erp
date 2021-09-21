const express= require("express");
const app=express();
const mongoose=require("mongoose");
const url="mongodb://localhost/mydb";

const parser=require('body-parser');
const cors = require('cors')

mongoose.connect(url)
const con=mongoose.connection
con.on('open',()=>{
    console.log('Connected to db');
})

app.use(express.json())

////////Required to get data from html
// app.use(parser.json())
// app.use(parser.urlencoded({    
//     extended: true})); 
// app.use(cors())
////////

//Routes
const mainRoute=require('./router/mainRoute')
app.use('/home',mainRoute)

//BDA assignment
// app.post('/check',async(req,res)=>{
//     console.log(req.body);
//     res.send({
//         response:req.body
//     })
// })

//Listen to server
app.listen(9000,()=>{
    console.log('Listening at port 9000');
});