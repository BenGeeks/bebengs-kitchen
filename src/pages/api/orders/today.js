import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  await dbConnect();
  let start = moment().tz('Asia/Manila').startOf('day');
  let end = moment().tz('Asia/Manila').endOf('day');

  try {
    const todayOrderList = await Order.find({ deliveryDate: { $gte: new Date(start), $lt: new Date(end) } });
    return res.status(200).json({ data: todayOrderList });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
