const bda=require('../models/bdaModel')
module.exports={
    async find(req,res){
        try
        {
            const stud=await bda.findById(req.query.id)
            res.send({
                status:200,
                response:stud
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
    async add(req,res){
        try
        {
            const {name,contact,marks1,marks2}=req.body;
            const insert=new bda({
                name,contact,marks1,marks2
            })
            const data=await insert.save();
            res.send({
                status:200,
                response :data
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
    async update(req,res){
        try
        {
            const details= await bda.findById(req.query.id)
            details.name=req.body.name
            const result=await details.save();
            res.send({
                status:200,
                response :result
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
    async remove(req,res){
        try
        {
            const del=await bda.deleteOne({_id:req.query.id})
            res.send({
                status:200,
                response :del
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
    }
}