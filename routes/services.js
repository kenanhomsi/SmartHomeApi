const express=require('express');
const router=express.Router();

const {showAllServices,CreateServices,Getsingleservice
,updateService}=require('../controllers/services')


router.route('/').post(CreateServices).get(showAllServices);
router.route('/singleService/').get(Getsingleservice).patch(updateService);

module.exports=router