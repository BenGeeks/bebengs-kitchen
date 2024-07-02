import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';
import { SignJWT } from 'jose';

const bcrypt = require('bcryptjs');
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export default async function handler(req, res) {
  const { method, body, headers } = req;

  if (method !== 'POST') {
    return res.status(404).json({ success: false, message: 'Invalid API method.' });
  }

  await dbConnect();

  try {
    let user = await User.findOne({ emailAddress: body.emailAddress });

    if (user === null) return res.status(401).json({ status: 'false', message: 'The email address was not found.' });

    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({ status: 'false', message: 'The password is incorrect.' });

    const token = await new SignJWT({ userId: user._id, emailAddress: user.emailAddress, role: user.role, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    return res.status(200).json({
      status: 'true',
      data: { userId: user._id, token: token, emailAddress: user.emailAddress, role: user.role, name: user.name },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
}
