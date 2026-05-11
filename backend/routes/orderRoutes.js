const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// إنشاء طلب جديد
router.post('/', orderController.createOrder);
// جلب جميع الطلبات
router.get('/', orderController.getOrders);
// جلب طلب برقم الطلب
router.get('/:orderId', orderController.getOrderById);

module.exports = router;
