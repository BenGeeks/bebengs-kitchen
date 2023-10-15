const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  createdAt: { type: String, required: true },
  orderDate: { type: String, required: true },
  datePaid: { type: String, required: false },
  deliveryTime: { type: String, required: false },
  deliveryDate: { type: String, required: true, index: true },
  downPayment: { type: Number, required: false },
  total: { type: Number, required: true },
  isGcash: { type: Boolean, required: true },
  isDelivered: { type: Boolean, required: true },
  isPaid: { type: Boolean, required: true },
  orderDetails: {
    customer: {
      _id: { type: String, required: true },
      displayName: { type: String, required: true },
    },
    items: [
      {
        _id: { type: String, required: true },
        menuId: { type: String, required: true },
        itemName: { type: String, required: true },
        size: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        subTotal: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
