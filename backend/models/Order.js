const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  service: { type: String, required: true },
  imei: { type: String, required: true },
  email: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  status: { type: String, default: 'قيد المعالجة' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
