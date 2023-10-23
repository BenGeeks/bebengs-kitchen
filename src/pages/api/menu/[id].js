import dbConnect from '@/lib/dbConnect';
import Menu from '@/model/menu';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const menu = await Menu.findById(id);
        res.status(200).json({ data: menu });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'DELETE':
      try {
        const deletedMenu = await Menu.findByIdAndDelete({ _id: id });
        if (!deletedMenu) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedMenu });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedMenu) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedMenu });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
