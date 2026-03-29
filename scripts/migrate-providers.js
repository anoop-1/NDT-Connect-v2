// Script to move all provider and admin users from 'users' to 'providers' and 'admins' collections
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ndt-connect';

async function migrateProvidersAndAdmins() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  console.log('Connected to DB:', db.name);

  const users = db.collection('users');
  const providers = db.collection('providers');
  const admins = db.collection('admins');

  // Print all users for debug
  const allUsers = await users.find({}).toArray();
  console.log('All users in users collection:', allUsers);

  // --- PROVIDERS ---
  const providerUsers = await users.find({ role: 'provider' }).toArray();
  console.log('Provider users found in users collection:', providerUsers.map(u => u.email));
  if (providerUsers.length > 0) {
    // Remove _id to avoid duplicate key error
    const providersToInsert = providerUsers.map(u => {
      const { _id, ...rest } = u;
      return rest;
    });
    // Only insert if not already present
    for (const provider of providersToInsert) {
      const exists = await providers.findOne({ email: provider.email });
      if (!exists) {
        await providers.insertOne(provider);
        console.log('Inserted provider:', provider.email);
      } else {
        console.log('Provider already exists in providers:', provider.email);
      }
    }
    // Remove from users
    const userIds = providerUsers.map(u => u._id);
    const delRes = await users.deleteMany({ _id: { $in: userIds } });
    console.log(`Removed ${delRes.deletedCount} providers from users collection.`);
  } else {
    console.log('No provider users found to migrate.');
  }

  // --- ADMINS ---
  const adminUsers = await users.find({ role: 'admin' }).toArray();
  console.log('Admin users found in users collection:', adminUsers.map(u => u.email));
  if (adminUsers.length > 0) {
    const adminsToInsert = adminUsers.map(u => {
      const { _id, ...rest } = u;
      return rest;
    });
    for (const admin of adminsToInsert) {
      const exists = await admins.findOne({ email: admin.email });
      if (!exists) {
        await admins.insertOne(admin);
        console.log('Inserted admin:', admin.email);
      } else {
        console.log('Admin already exists in admins:', admin.email);
      }
    }
    const adminIds = adminUsers.map(u => u._id);
    const delRes = await users.deleteMany({ _id: { $in: adminIds } });
    console.log(`Removed ${delRes.deletedCount} admins from users collection.`);
  } else {
    console.log('No admin users found to migrate.');
  }

  await mongoose.disconnect();
  console.log('Migration complete.');
}

migrateProvidersAndAdmins().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
