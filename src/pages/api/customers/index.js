import dbConnect from '@/lib/dbConnect';
import Customer from '@/model/customer';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const customers = await Customer.find({});
        res.status(200).json({ data: customers });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const customer = await Customer.create(body);
        res.status(201).json({ success: true, data: customer });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
