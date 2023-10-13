import dbConnect from '@/lib/dbConnect';
import Variation from '@/model/variation';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const variationList = await Variation.find({ menu_id: id });
        res.status(200).json({ data: variationList });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'DELETE':
      try {
        const deletedVariation = await Variation.findByIdAndDelete({ _id: id });
        if (!deletedVariation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedVariation });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedVariation = await Variation.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedVariation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedVariation });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
