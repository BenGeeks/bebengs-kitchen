import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment';

export default async function handler(req, res) {
  await dbConnect();
  let start = moment().startOf('day');
  let end = moment().endOf('day');
  try {
    const todayOrderList = await Order.find({ deliveryDate: { $gte: new Date(start), $lt: new Date(end) } });
    res.status(200).json({ data: todayOrderList });
  } catch (error) {
    res.status(400).json({ error });
  }
}
