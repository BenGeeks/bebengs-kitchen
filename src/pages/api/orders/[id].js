import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const deletedOrder = await Order.findByIdAndDelete({ _id: id });
        if (!deletedOrder) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedOrder });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedOrder) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedOrder });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
