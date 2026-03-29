// scripts/seed-predefined-lists.js
// Run: node scripts/seed-predefined-lists.js
// Seeds MongoDB with predefined lists for dropdowns

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ndtconnect';
const client = new MongoClient(uri);

const ndtServices = [
  { name: 'Ultrasonic Testing (UT)' },
  { name: 'Radiographic Testing (RT)' },
  { name: 'Magnetic Particle Testing (MT)' },
  { name: 'Liquid Penetrant Testing (PT)' },
  { name: 'Eddy Current Testing (ET)' },
  { name: 'Visual Testing (VT)' },
  { name: 'Acoustic Emission Testing (AE)' },
  { name: 'Leak Testing (LT)' },
  { name: 'Thermographic Testing (TT)' },
  { name: 'Computed Tomography (CT)' },
  // ...add more as needed
];

const units = [
  { name: 'Hour', symbol: 'hr' },
  { name: 'Day', symbol: 'd' },
  { name: 'Job', symbol: 'job' },
  { name: 'Piece', symbol: 'pc' },
  // ...add more as needed
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  // ...add more as needed
];

const taxRates = [
  { name: 'No Tax', rate: 0 },
  { name: 'GST 5%', rate: 5 },
  { name: 'VAT 10%', rate: 10 },
  { name: 'VAT 20%', rate: 20 },
  // ...add more as needed
];

const companyCertifications = [
  { name: 'IACS Member', category: 'IACS' },
  { name: 'ISO 9001', category: 'ISO' },
  { name: 'ISO 17020', category: 'ISO' },
  { name: 'ISO 17025', category: 'ISO' },
  // ...add all IACS members and ISO certifications
];

const personnelCertifications = [
  { name: 'ASNT (SNT-TC-1A)', body: 'ASNT', level: 'I/II/III' },
  { name: 'PCN', body: 'PCN', level: 'I/II/III' },
  { name: 'ISO 9712', body: 'ISO', level: 'I/II/III' },
  { name: 'NAS 410', body: 'NAS', level: 'I/II/III' },
  { name: 'NADCAP', body: 'NADCAP', level: '' },
  { name: 'CGSB', body: 'CGSB', level: 'I/II/III' },
  // ...add more as needed
];

async function seed() {
  try {
    await client.connect();
    const db = client.db();
    await db.collection('ndt_services').deleteMany({});
    await db.collection('ndt_services').insertMany(ndtServices);
    await db.collection('units').deleteMany({});
    await db.collection('units').insertMany(units);
    await db.collection('currencies').deleteMany({});
    await db.collection('currencies').insertMany(currencies);
    await db.collection('tax_rates').deleteMany({});
    await db.collection('tax_rates').insertMany(taxRates);
    await db.collection('company_certifications').deleteMany({});
    await db.collection('company_certifications').insertMany(companyCertifications);
    await db.collection('personnel_certifications').deleteMany({});
    await db.collection('personnel_certifications').insertMany(personnelCertifications);
    console.log('✅ Predefined lists seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding predefined lists:', err);
  } finally {
    await client.close();
  }
}

seed();
