
import dbConnect from './mongodb';
import { User } from './models/User';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordSetupEmail } from './email';
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

export async function generatePasswordResetToken(email: string): Promise<{ sent: boolean }> {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return { sent: false };

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: token,
    resetPasswordExpiry: expiry,
    updatedAt: new Date(),
  });

  await sendPasswordSetupEmail(email, user.name, token);
  return { sent: true };
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  await dbConnect();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: new Date() },
  });

  if (!user) return { success: false, message: 'Invalid or expired reset link.' };

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, {
    password: hashed,
    mustResetPassword: false,
    resetPasswordToken: null,
    resetPasswordExpiry: null,
    verified: true,
    updatedAt: new Date(),
  });

  return { success: true, message: 'Password updated.' };
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
