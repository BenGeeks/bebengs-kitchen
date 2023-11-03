import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    Order.find({
      $and: [{ isDelivered: true }, { isPaid: false }, { deliveryDate: { $lt: moment(body.dateToday) } }],
    })
      .sort({ deliveryDate: 1 })
      .then((data) => {
        res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        res.status(400).json({ success: false, error: error });
      });
  }
}
