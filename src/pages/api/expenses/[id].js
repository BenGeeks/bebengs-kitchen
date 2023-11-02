import dbConnect from '@/lib/dbConnect';
import Menu from '@/model/menu';
import Expenses from '@/model/expenses';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const expense = await Expenses.findById(id);
        res.status(200).json({ data: expense });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'DELETE':
      try {
        const deletedExpense = await Expenses.findByIdAndDelete({ _id: id });
        if (!deletedExpense) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedExpense });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedExpense = await Expenses.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedExpense) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedExpense });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
