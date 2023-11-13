import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    try {
      const orderList = await Order.find({
        $or: [
          { deliveryDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
          { paymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
          { downPaymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
        ],
      });
      res.status(201).json({ success: true, data: orderList });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  }
}
