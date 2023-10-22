import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
  const { body } = req;
  await dbConnect();

  try {
    User.findOne({ userName: body.userName }).then((user) => {
      if (user == null) return res.status(401).json({ status: 'Failed', message: 'The user was not found' });
      if (!bcrypt.compareSync(req.body.password, user.password))
        return res.status(401).json({ status: 'Failed', message: 'The password did not match' });
      let accessToken = jwt.sign({ user: user.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });
      res.status(200).json({
        status: 'Success',
        message: 'Logged in successfully!',
        data: { token: accessToken, user: user.userName },
      });
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
