const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');


const ServiceSchema=mongoose.Schema({
    ownerName:{
        type:String,
        required:[true,'please provide the owner name'],
        unique:true,
        minLength:10,
        maxLength:50
    },
    gassSensor:Number,
    flameSensor:Number,
    IR_K_Sensor:Number,
    IR_D_Sensor:Number,
    PIRSensor:Number,
    LED_living_Sensor:{  
        type:String,
        enum:['on','off'],
    },
    LED_kitchen_Sensor:{  
        type:String,
        enum:['on','off'],
    },
    LED_Balcony_Sensor:{  
        type:String,
        enum:['on','off'],
    },
    LED_garden_left_Sensor:{  
        type:String,
        enum:['on','off'],
    },
    LED_garden_right_livingSensor:{  
        type:String,
        enum:['on','off'],
    },
    LED_pool_livingSensor:{  
        type:String,
        enum:['on','off'],
    },
    DoorStatue: {  
        type:String,
        enum:['on','off'],
    },
    securityStatue:{  
        type:String,
        enum:['on','off'],
    },
})

module.exports=mongoose.model('Service',ServiceSchema);