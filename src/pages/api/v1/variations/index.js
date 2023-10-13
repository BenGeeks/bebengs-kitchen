import dbConnect from '@/lib/dbConnect';
import Variation from '@/model/variation';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();
  console.log(body);

  switch (method) {
    case 'GET':
      try {
        const variationList = await Variation.find({});
        res.status(200).json({ data: variationList });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const variation = await Variation.create(body);
        res.status(201).json({ success: true, data: variation });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
