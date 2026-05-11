const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection

app.get('/', (req, res) => {
  res.send('iCloud Unlock Orders API');
});

// مصفوفة مؤقتة لتخزين الطلبات
const orders = [];

// إنشاء طلب جديد
app.post('/api/orders', (req, res) => {
  const { service, imei, email } = req.body;
  const orderId = '#IU-' + Math.floor(Math.random() * 90000 + 10000);
  const order = {
    service,
    imei,
    email,
    orderId,
    status: 'قيد المعالجة',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  orders.push(order);
  res.status(201).json({ success: true, order });
});

// جلب جميع الطلبات
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders: orders.slice().reverse() });
});

// جلب طلب برقم الطلب
app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
  res.json({ success: true, order });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
