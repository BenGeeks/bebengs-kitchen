import dbConnect from '@/lib/dbConnect';
import Report from '@/model/report';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const deletedReport = await Report.findByIdAndDelete({ _id: id });
        if (!deletedReport) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedReport });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedReport = await Report.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedReport) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedReport });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
