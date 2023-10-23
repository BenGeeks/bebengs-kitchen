import dbConnect from '@/lib/dbConnect';
import Menu from '@/model/menu';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const menuList = await Menu.find({});
        res.status(200).json({ data: menuList });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'POST':
      try {
        const menu = await Menu.create(body);
        res.status(201).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
