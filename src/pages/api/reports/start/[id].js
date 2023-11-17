import dbConnect from '@/lib/dbConnect';
import Start from '@/model/start';

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
        const deletedStart = await Start.findByIdAndDelete({ _id: id });
        if (!deletedStart) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedStart });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedStart = await Start.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedStart) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedStart });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
