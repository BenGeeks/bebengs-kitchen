import dbConnect from '@/lib/dbConnect';
import Orders from '@/model/order';
import Expenses from '@/model/expenses';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  let start = moment.tz(req.query.date, 'Asia/Manila').startOf('day');
  let end = moment.tz(req.query.date, 'Asia/Manila').endOf('day');

  const salesListRequest = Orders.find({
    $or: [{ downPaymentDate: { $gte: start, $lt: end } }, { paymentDate: { $gte: start, $lt: end } }],
  });

  const expenseListRequest = Expenses.find({ expenseDate: { $gte: start, $lt: end } });

  Promise.all([salesListRequest, expenseListRequest])
    .then(([salesList, expenseList]) => {
      return res.status(200).json({ success: true, data: { salesList, expenseList } });
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error });
    });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
