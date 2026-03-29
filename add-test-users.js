#!/usr/bin/env node

const fetch = require('node-fetch');

// Script to add some test users to the database
// Usage: node add-test-users.js

/*
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profileImageUrl: { type: String, default: null },
  verified: { type: Boolean, default: true },
  verificationToken: { type: String, default: null },

*/

async function addTestUsers() {
  const testUsers = [
    {
      email: 'john.client@example.com',
      name: 'John Client',
      role: 'client',
      companyName: 'ABC Manufacturing',
      industry: 'Manufacturing',
      primaryLocation: 'New York, NY',
      contactNumber: '+1-555-0101'
    },
    {
      email: 'sarah.provider@example.com',
      name: 'Sarah Provider',
      role: 'provider',
      companyName: 'NDT Solutions Inc',
      businessLocation: 'Los Angeles, CA',
      contactNumber: '+1-555-0102',
      servicesOffered: [],
      personnelQualifications: [],
      companyCertifications: [],
      bioUrl: '',
      companyLogo: '' // link to Photo
    },
    {
      email: 'mike.inspector@example.com',
      name: 'Mike Inspector',
      role: 'inspector',
      association: 'freelancer',
      contactNumber: '+1-555-0103'
    }
  ];

  console.log('🔄 Adding test users to database...\n');

  for (const user of testUsers) {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully created user: ${user.name} (${user.email})`);
      } else {
        const error = await response.json();
        console.log(`❌ Failed to create user ${user.name}: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ Error creating user ${user.name}: ${error.message}`);
    }
  }

  console.log('\n🎉 Test users creation completed!');
  console.log('\n💡 Now run "node show-users.js" to see all registered users');
}

// Run the function
addTestUsers();
