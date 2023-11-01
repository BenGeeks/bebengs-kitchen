import dbConnect from '@/lib/dbConnect';
import Expenses from '@/model/expenses';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const expensesList = await Expenses.find({});
        res.status(200).json({ data: expensesList });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const expenses = await Expenses.create(body);
        res.status(201).json({ success: true, data: expenses });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
