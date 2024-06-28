import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  if (JSON.parse(req.headers['x-user-payload']).role !== 'admin') {
    return res.status(401).json({ success: false, message: `Only an admin can ${method === 'DELETE' ? 'delete' : 'update'} a new user.` });
  }

  switch (method) {
    case 'DELETE':
      try {
        const deletedUser = await User.findByIdAndDelete({ _id: id });

        if (!deletedUser) {
          return res.status(400).json({ success: false, message: 'The user was not found.' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully.' });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case 'PUT':
      try {
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedUser) {
          return res.status(400).json({ success: false, message: 'The user was not found.' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully.' });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid API method.' });
      break;
  }
}
