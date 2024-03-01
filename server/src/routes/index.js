
const { Router, request }= require('express');
const router = Router();
const postProductRouter = require('../routes/postProduct_router');
const postUserRouter = require('../routes/Users_router'); 
const paymentRouter = require('../routes/payment_router'); 


router.use('/', postProductRouter, postUserRouter, paymentRouter,  ) 



















module.exports = router