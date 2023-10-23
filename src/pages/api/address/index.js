import dbConnect from '@/lib/dbConnect';
import Address from '@/model/address';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const address = await Address.find({});
        res.status(200).json({ data: address });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const address = await Address.create(body);
        res.status(201).json({ success: true, data: address });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
