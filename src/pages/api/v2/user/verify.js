import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(404).json({ success: false, message: 'Invalid API method.' });
  }

  await dbConnect();

  if (JSON.parse(req.headers['x-user-payload']).userId === body.userId) {
    return res.status(200).json({ status: 'true', message: 'User has been verified.' });
  } else {
    return res.status(200).json({ status: 'false', message: 'User not verified.' });
  }
}
