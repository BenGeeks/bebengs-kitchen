// import dbConnect from '@/lib/dbConnect';
// import Report from '@/model/report';

// export default async function handler(req, res) {
//   const { method, body } = req;
//   await dbConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const report = await Report.find({ date: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } });
//         res.status(200).json({ data: report });
//       } catch (error) {
//         res.status(400).json({ error });
//       }
//       break;
//     case 'POST':
//       try {
//         const report = await Report.create(body);
//         res.status(201).json({ success: true, data: report });
//       } catch (error) {
//         res.status(400).json({ success: false, error: error });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
