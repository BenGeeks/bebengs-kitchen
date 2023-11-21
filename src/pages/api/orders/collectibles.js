import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import moment from 'moment';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'GET') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    Order.find({
      $and: [{ isDelivered: true }, { isPaid: false }],
    })
      .sort({ deliveryDate: 1 })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
