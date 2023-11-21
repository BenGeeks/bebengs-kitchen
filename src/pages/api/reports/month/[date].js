import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  try {
    const report = await Report.find({
      date: {
        $gte: moment.tz(req.query.date, 'Asia/Manila').startOf('month'),
        $lt: moment.tz(req.query.date, 'Asia/Manila').endOf('month'),
      },
    });
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(400).json({ error });
  }
}
