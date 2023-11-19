import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { date },
  } = req;
  await dbConnect();

  try {
    const report = await Report.find({
      date: { $gte: moment(date, 'Asia/Manila').startOf('month'), $lt: moment(date, 'Asia/Manila').endOf('month') },
    });
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(400).json({ error });
  }
}
