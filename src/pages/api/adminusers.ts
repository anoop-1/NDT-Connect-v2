import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '../../models/User';

const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { method, query, body } = req;

  // If id is present in query, operate on a single user
  if (query.id) {
    const { id } = query;

    if (method === 'PUT') {
      // Edit user
      try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
      }
    }

    if (method === 'DELETE') {
      // Delete user
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted' });
      } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
      }
    }

    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }

  // No id: operate on the collection
  if (method === 'GET') {
    // List all users
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
  }

  return res.status(405).json({ message: `Method ${method} Not Allowed` });
}