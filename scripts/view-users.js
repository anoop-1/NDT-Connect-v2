// Test script to view all registered users from the database
// Run with: node scripts/view-users.js

import { getAllUsers } from '../lib/auth-service.js';

async function viewAllUsers() {
  try {
    console.log('🔄 Fetching all registered users from database...\n');
    
    const users = await getAllUsers();
    
    if (users.length === 0) {
      console.log('📭 No users found in the database.');
      return;
    }
    
    console.log(`📊 Total users found: ${users.length}\n`);
    
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
      console.log(`  ${role}: ${roleUsers.length} users`);
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
      console.log(`   📅 Created: ${user.createdAt?.toLocaleDateString() || 'Unknown'}`);
      console.log(`   🔄 Updated: ${user.updatedAt?.toLocaleDateString() || 'Unknown'}`);
      
      // Add role-specific information
      if (user.role === 'client' && user.companyName) {
        console.log(`   🏢 Company: ${user.companyName}`);
        console.log(`   🏭 Industry: ${user.industry || 'Not specified'}`);
        console.log(`   📍 Location: ${user.primaryLocation || 'Not specified'}`);
      } else if (user.role === 'provider' && user.companyName) {
        console.log(`   🏢 Company: ${user.companyName}`);
        console.log(`   📍 Location: ${user.location || 'Not specified'}`);
        console.log(`   🛠️  Services: ${user.servicesOffered?.length || 0} services offered`);
      } else if (user.role === 'inspector') {
        console.log(`   🔍 Association: ${user.association || 'Not specified'}`);
        console.log(`   🏢 Company: ${user.companyName || 'Not specified'}`);
      }
      
      console.log('─'.repeat(80));
    });
    
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    console.error('Full error:', error);
  }
}

// Run the function
viewAllUsers();
