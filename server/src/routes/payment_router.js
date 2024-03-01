const { Router }= require('express');
const router = Router();
const { captureOrder } = require('../controllers/captureOrder');
const { createOrder } = require('../controllers/createOrder');

router.post('/create-payment/:productId', createOrder)
router.get('/capture-order', captureOrder)

module.exports = router
