import dbConnect from '@/lib/dbConnect';
import Expenses from '@/model/expenses';
import moment from 'moment';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    try {
      const expensesList = await Expenses.find({ expenseDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } });
      res.status(201).json({ success: true, data: expensesList });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  }
}
