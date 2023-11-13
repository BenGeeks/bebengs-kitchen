import dbConnect from '@/lib/dbConnect';
import Orders from '@/model/order';
import Expenses from '@/model/expenses';
import moment from 'moment';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  const salesListRequest = Orders.find({
    $or: [
      { downPaymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
      { paymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
    ],
  });

  const expenseListRequest = Expenses.find({ expenseDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } });

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
