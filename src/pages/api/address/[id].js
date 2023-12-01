import dbConnect from '@/lib/dbConnect';
import Address from '@/model/address';

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
        const deletedAddress = await Address.findByIdAndDelete({ _id: id });
        if (!deletedAddress) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedAddress });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedAddress = await Address.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedAddress) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedAddress });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid Method' });
      break;
  }
}
