import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  try {
    const report = await Report.create(body);
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
