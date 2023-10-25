import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';

export default async function handler(req, res) {
  const { method, body, query } = req;
  await dbConnect();

  console.log('QUERY DATE: ', query.dateFrom);

  switch (method) {
    case 'GET':
      try {
        // const orderList = await Order.find({});
        const todayOrderList = await Order.find({ deliveryDate: { $gte: new Date(query.dateFrom), $lt: new Date(query.dateTo) } });
        res.status(200).json({ data: orderList });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const order = await Order.create(body);
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
