import dbConnect from '@/lib/dbConnect';
import Customer from '@/model/customer';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;
  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const deletedCustomer = await Customer.findByIdAndDelete({ _id: id });
        if (!deletedCustomer) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedCustomer });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedCustomer) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedCustomer });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid Method' });
      break;
  }
}
