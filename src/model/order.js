const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    paymentDate: { type: Date, required: false },
    deliveryDate: { type: Date, required: true, index: true },
    deliveryTime: { type: String, required: false },
    isDownPayment: { type: Boolean, required: true },
    downPayment: { type: Number, required: false },
    deliveryCharge: { type: Number, required: false },
    discount: { type: Number, required: false },
    total: { type: Number, required: true },
    isGcash: { type: Boolean, required: true },
    isDelivered: { type: Boolean, required: true },
    isPaid: { type: Boolean, required: true },
    orderDetails: {
      customer: {
        name: { type: String, required: true },
        phone: { type: String, required: false },
        address: { type: String, required: false },
        block: { type: String, required: false },
        lot: { type: String, required: false },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
