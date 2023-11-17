import dbConnect from '@/lib/dbConnect';
import Start from '@/model/start';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    res.status(401).json({ message: 'INTRUDER ALERT!' });
  } else {
    try {
      const start = await Start.create(req.body);
      res.status(201).json({ success: true, data: start });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  }
}
