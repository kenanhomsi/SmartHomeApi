const Service=require('../models/Services');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')

const CreateServices=async (req,res)=>{
    const services=await Service.create({...req.body});
    if(!services){
        throw new BadRequestError('please do it coorectly');
    }
    res.status(StatusCodes.CREATED).json({services});
}
const showAllServices= async (req,res)=>{
    const services=await Service.find({});
    if(!services){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(services);
}

const Getsingleservice=async (req,res)=>{
    const{username}=req.body;
    const service=await Service.findOne({ownerName:username});
    if(!service){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({service});
}
const updateService=async (req,res)=>{
    let username=req.user.name;
   
    const service=await Service.findOneAndUpdate({ownerName:username},{...req.body})
    if(!service){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({service});
}


module.exports={showAllServices,CreateServices,Getsingleservice,updateService}