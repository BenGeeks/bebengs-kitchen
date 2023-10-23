import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') return;
  try {
    const client = await dbConnect();
    const newUser = await User.create({ username: body.username, pin: bcrypt.hashSync(body.pin, salt) });
    res.status(201).json({ success: true, data: newUser });
    client.close();
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
