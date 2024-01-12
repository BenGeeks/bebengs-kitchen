import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  const filterBy = req.query.filterBy;
  const filterValue = req.query.filterValue;

  const getStartDate = () => {
    let startDate;
    if (filterBy === 'year') startDate = moment.tz(`${filterValue}-01-01`, 'Asia/Manila').startOf('year');
    if (filterBy === 'quarter') {
      let filter = filterValue.split('_');
      let quarter = filter[0];
      let year = filter[1];
      if (quarter === 'Q1') startDate = moment.tz(`${year}-01-01`, 'Asia/Manila').startOf('quarter');
      if (quarter === 'Q2') startDate = moment.tz(`${year}-04-01`, 'Asia/Manila').startOf('quarter');
      if (quarter === 'Q3') startDate = moment.tz(`${year}-07-01`, 'Asia/Manila').startOf('quarter');
      if (quarter === 'Q4') startDate = moment.tz(`${year}-10-01`, 'Asia/Manila').startOf('quarter');
    }
    if (filterBy === 'month') {
      let filter = filterValue.split('_');
      let month = filter[0];
      let year = filter[1];
      startDate = moment.tz({ year, month }, 'Asia/Manila').startOf('month');
    }

    return startDate;
  };

  const getEndDate = () => {
    let endDate;
    if (filterBy === 'year') endDate = moment.tz(`${filterValue}-01-01`, 'Asia/Manila').endOf('year');
    if (filterBy === 'quarter') {
      let filter = filterValue.split('_');
      let quarter = filter[0];
      let year = filter[1];
      if (quarter === 'Q1') endDate = moment.tz(`${year}-01-01`, 'Asia/Manila').endOf('quarter');
      if (quarter === 'Q2') endDate = moment.tz(`${year}-04-01`, 'Asia/Manila').endOf('quarter');
      if (quarter === 'Q3') endDate = moment.tz(`${year}-07-01`, 'Asia/Manila').endOf('quarter');
      if (quarter === 'Q4') endDate = moment.tz(`${year}-10-01`, 'Asia/Manila').endOf('quarter');
    }
    if (filterBy === 'month') {
      let filter = filterValue.split('_');
      let month = filter[0];
      let year = filter[1];
      endDate = moment.tz({ year, month }, 'Asia/Manila').endOf('month');
    }
    return endDate;
  };

  try {
    const report = await Report.find({
      date: {
        $gte: getStartDate(),
        $lt: getEndDate(),
      },
    });
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
