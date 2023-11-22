import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  let start = moment().tz('Asia/Manila').startOf('day');
  let end = moment().tz('Asia/Manila').endOf('day');

  try {
    const orderList = await Order.find({
      $or: [
        { deliveryDate: { $gte: start, $lt: end } },
        { paymentDate: { $gte: start, $lt: end } },
        { downPaymentDate: { $gte: start, $lt: end } },
      ],
    });
    res.status(201).json({ success: true, data: orderList });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
