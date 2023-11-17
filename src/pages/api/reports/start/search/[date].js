import dbConnect from '@/lib/dbConnect';
import Start from '@/model/start';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    try {
      const start = await Start.find({ date: req.query.date });
      res.status(200).json({ data: start });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
