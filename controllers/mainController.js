// const { update } = require('../models/mainModel');
const db = require('../models/mainModel');

module.exports={
    async find(req,res){
        try
        {
            const data=await db.find()
            res.send({
                response:data
            })
        }
        catch(err)
        {
            res.send({
                status:502,
                message:err.message,
                response:null
            })
        }
    },

    async findParticular(req,res){
        try
        {
            // console.log(req.params.id);
            const data= await db.findById(req.query.id)
            res.send({
                status:200,
                response:data
            })
        }
        catch(err)
        {
            res.send({
                status:502,
                message:err.message,
                response:null
            })
        }
    },

    async addDetails(req,res){
        try
        {
            const {name,contact,email,level}=req.body;
            const employee=new db({
                name,contact,email,level
            })
            const emp=await employee.save()
            res.send({
                status:200,
                response :emp
            })
        }
        catch(err)
        {
            res.send({
                status:502,
                message:`Internal server error. ${err.message}`,
                response:null
            })
        }
    },
    async deleteEmp(req,res){
        try
        {
            const del =await db.deleteOne({_id:req.query.id})
            res.send({
                status:200,
                message:'Deleted',
                response:del
            })
        }
        catch(err)
        {
            res.send({
                status:502,
                message:`Internal server error. ${err.message}`,
                response:null
            })
        }
    },
    async update(req,res){
        try
        {
            const data=await db.findById(req.query.id)
            data.email=req.body.email
            const result=await data.save()
            res.send({
                status:200,
                message:'Updated',
                response:result
            })
        }
        catch(err)
        {
            res.send({
                status:502,
                message:`Internal server error. ${err.message}`,
                response:null
            })
        }
    }
}