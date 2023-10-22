import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default async function handler(req, res) {
  const { body } = req;
  await dbConnect();

  try {
    const newUser = await User.create({ ...body, password: bcrypt.hashSync(req.body.password, salt) });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
