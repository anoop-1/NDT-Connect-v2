#!/usr/bin/env node

// Simple script to fetch and display all registered users
// Usage: node show-users.js

const https = require('http');

async function fetchUsers() {
  try {
    console.log('🔄 Fetching all registered users from database...\n');
    
    const response = await fetch('http://localhost:3000/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const { users, total } = data;
    
    if (total === 0) {
      console.log('📭 No users found in the database.');
      return;
    }
    
    console.log(`📊 Total users found: ${total}\n`);
    
    // Group users by role
    const usersByRole = users.reduce((acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = [];
      }
      acc[user.role].push(user);
      return acc;
    }, {});
    
    // Display summary
    console.log('📈 Summary by role:');
    Object.entries(usersByRole).forEach(([role, roleUsers]) => {
      const roleIcon = {
        client: '🏢',
        provider: '🛠️',
        inspector: '🔍', 
        admin: '👑'
      }[role] || '👤';
      console.log(`  ${roleIcon} ${role}: ${roleUsers.length} users`);
    });
    console.log('');
    
    // Display all users
    console.log('👥 All registered users:');
    console.log('═'.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🏷️  Role: ${user.role}`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   📅 Created: ${new Date(user.createdAt).toLocaleDateString()}`);
      console.log(`   🔄 Updated: ${new Date(user.updatedAt).toLocaleDateString()}`);
      console.log('─'.repeat(80));
    });
    
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Make sure the Next.js server is running:');
      console.error('   npm run dev');
    }
  }
}

// Run the function
fetchUsers();
