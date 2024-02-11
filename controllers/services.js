const Service=require('../models/Services');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')
//
const https = require('https');

//
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
    let username=req.user.name;
    const service=await Service.findOne({ownerName:username});
    if(!service){
        throw new BadRequestError('wrong userName');
    }
    let noticeMessage="";
    let gassSensor=service.gassSensor;
    let flameSensor=service.flameSensor;
    let IR_K_Sensor=service.IR_K_Sensor;
    let IR_D_Sensor=service.IR_D_Sensor;
    let PIRSensor=service.PIRSensor;
    let DoorStatue=service.DoorStatue;
    
    if(gassSensor!= 0){
        noticeMessage +=`gass leak`;
    }
    if(flameSensor!= -1){
        noticeMessage +=` flame detected`;
    }
    if(IR_K_Sensor!= 0){
        noticeMessage +=` IR sensor in kitchen has detected a motion`;
    }
    if(IR_D_Sensor!= 0){
        noticeMessage +=` IR sensor in frot door has detected a motion`;
    }
    if(PIRSensor!= 0){
        noticeMessage +=` IR sensor in garden has detected a motion`;
    }
    if(DoorStatue != "off"){
        noticeMessage +=` the Door was opened`;
    }
   

    if(noticeMessage !=""){
        const data = JSON.stringify({
            notification : {
              body : noticeMessage,
              title : 'Notices from home',
              icon: "@mipmap/ic_launcher"
            },
            content_available: true,
            priority: "high",
            to: "/topics/raneem",
          });
          const options = {
            hostname:'fcm.googleapis.com' , // The hostname of the API
            path: '/fcm/send', // The path of the API endpoint
            method: 'POST', // The HTTP method
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length, // The length of the data
              'Authorization': 'key=AAAAHpfLFI8:APA91bHLXkwKsWu-yAmfloLO1SIZsfhk02Jc9CUtz7vKvgFw6-EIwNwHOjKrxtls654TFyZYKyZsuPBYUJlTvDPKj8_XsMxd0P_zBlsvMmdsYFYorPjEAQMb8sZIBRJk_XOT_qUnaEGK'
              }
            };
            const reqFroMobile = https.request(options, (res) => {
            // Handle the response
            console.log(`Status: ${res.statusCode}`); // Log the status code
            res.on('data', (chunk) => {
                // Log the response data
                console.log(`Body: ${chunk}`);
            });
            });
            reqFroMobile.on('error', (error) => {
            console.error(error);
            });
            reqFroMobile.write(data);
            reqFroMobile.end();
    }


    res.status(200).json({service});
}
const updateService=async (req,res)=>{
    let username=req.user.name;
    console.log(req.body);
    const service=await Service.findOneAndUpdate({ownerName:username},{...req.body})
    if(!service){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({service});
}


module.exports={showAllServices,CreateServices,Getsingleservice,updateService}