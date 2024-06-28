import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(404).json({ success: false, message: 'Invalid API method.' });
  }

  if (JSON.parse(req.headers['x-user-payload']).role !== 'admin') {
    return res.status(401).json({ success: false, message: "Only Admin's can create a new user." });
  }

  try {
    const client = await dbConnect();
    let isExistingUser = await User.findOne({ emailAddress: body.emailAddress });

    if (isExistingUser) {
      res.status(201).json({ success: false, message: `The email address already exist` });
    } else {
      await User.create({
        emailAddress: body.emailAddress,
        password: bcrypt.hashSync(body.password, salt),
        name: body.name,
        role: body.role,
      });
      res.status(201).json({ success: true, message: `New user created successfully` });
    }
    client.close();
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
