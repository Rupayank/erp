const mongoose=require('mongoose')
const student=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    marks1:{
        type:Number,
        required:true
    },
    marks2:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('student',student)