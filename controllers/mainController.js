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
            const data=db.findById(req.query.id)
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
    }
}