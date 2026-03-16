
import dbConnect from './mongodb';
import { User } from './models/User';
import crypto from 'crypto';
import { sendVerificationEmail } from './email';
import bcrypt from 'bcryptjs';

export async function registerUser(details: {
  email: string;
  role: 'client' | 'provider' | 'inspector' | 'admin';
  name: string;
  password?: string;
  profileData?: any;
}): Promise<any> {
  await dbConnect();

  const { email, role, name, password = '',  profileData = {} } = details;

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const userData = {
    email,
    name,
    role,
    profileData, 
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: false,
    password: await bcrypt.hash(password, 10),
    verificationToken
  };

  try {
    const newUser = await User.create(userData);

    await sendVerificationEmail(email, verificationToken);

    return newUser.toObject();
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<any> {
  await dbConnect();

  try {
    const user = await User.findOne({ email });
    return user ? user.toObject() : null;
  } catch (error: any) {
    console.error('Error finding user:', error);
    throw error;
  }
}

export async function updateUser(user: any): Promise<void> {
  await dbConnect();

  try {
    await User.findByIdAndUpdate(user._id, {
      ...user,
      updatedAt: new Date()
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<any[]> {
  await dbConnect();

  try {
    const users = await User.find({});
    return users.map(user => user.toObject());
  } catch (error: any) {
    console.error('Error getting all users:', error);
    throw error;
  }
}
