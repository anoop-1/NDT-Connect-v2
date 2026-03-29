// Script to create an admin user in MongoDB using your Mongoose models
// Usage: node scripts/create-mongo-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = mongodb://localhost:27017/ndt-connect';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  role: {
    type: String,
    enum: ['client', 'provider', 'inspector', 'admin'],
    required: [true, 'Role is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  profileImageUrl: {
    type: String,
    default: null,
  },  
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);
  const email = 'anoop@atlantisinspection.com';
  const password = 'Atlantis9$';
  const name = 'Admin User';
  const role = 'admin';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  const status = await User.create({
    email,
    password: hashed,
    name,
    role,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(status)
  console.log('Admin user created in MongoDB.');
  process.exit(0);
}

createAdmin();
