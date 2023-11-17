import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';
import moment from 'moment';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { date },
  } = req;
  await dbConnect();

  //   let month = date.substring(0, 2);
  //   var year = date.substring(2);
  let searchDate = moment(date).endOf('month');

  console.log('DATE: ', searchDate);

  try {
    const report = await Report.find({ date: { $gte: moment(date).startOf('month'), $lt: moment(date).endOf('month') } });
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(400).json({ error });
  }
}
