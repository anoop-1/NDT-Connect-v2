// scripts/seed-admin.ts
// Run with: npx ts-node scripts/seed-admin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://NdtConnectV2:LjWVV62ub05905jQ@ndtconnect.qpbvncb.mongodb.net/NDTConnect2?retryWrites=true&w=majority&appName=NDTConnect';

async function seedAdmin() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  if (!db) throw new Error('DB not connected');

  const users = db.collection('users');

  const existing = await users.findOne({ email: 'anoop@atlantisinspection.com' });
  if (existing) {
    console.log('Admin user already exists. Updating password and role...');
    await users.updateOne(
      { email: 'anoop@atlantisinspection.com' },
      {
        $set: {
          role: 'admin',
          password: await bcrypt.hash('Atlantis9$', 10),
          isActive: true,
          name: 'Anoop R',
          updatedAt: new Date()
        }
      }
    );
    console.log('Admin user updated.');
  } else {
    await users.insertOne({
      email: 'anoop@atlantisinspection.com',
      name: 'Anoop R',
      role: 'admin',
      password: await bcrypt.hash('Atlantis9$', 10),
      isActive: true,
      verified: true,
      profileData: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Admin user created.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch(console.error);
