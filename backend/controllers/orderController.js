const Order = require('../models/Order');

// إنشاء طلب جديد
exports.createOrder = async (req, res) => {
  try {
    const { service, imei, email } = req.body;
    // توليد رقم طلب عشوائي
    const orderId = '#IU-' + Math.floor(Math.random() * 90000 + 10000);
    const order = new Order({ service, imei, email, orderId });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// جلب جميع الطلبات (للوحة التحكم)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// جلب طلب واحد برقم الطلب
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
