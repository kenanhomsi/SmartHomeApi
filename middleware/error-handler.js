const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let CustomError={
    statuscode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || "something goes wrong"
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name ==='CastError'){
    CustomError.msg=`no item found with id ${err.value}`;
    CustomError.statuscode=404;
  }
  if(err.name === 'ValidationError'){
      CustomError.msg=Object.values(err.errors).map((item)=>item.message).join(',');
      CustomError.statuscode=400
  }
  if(err.code && err.code === 11000 ){
    CustomError.msg=`Duplicate value enterd for ${Object.keys(err.keyValue) } fields , please chooes another one`
    CustomError.statuscode=400;
    }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statuscode).json({msg:CustomError.msg })

}

module.exports = errorHandlerMiddleware
