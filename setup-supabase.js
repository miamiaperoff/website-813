#!/usr/bin/env node

/**
 * Setup script for 813 Cafe Supabase integration
 * This script helps you set up the database and create demo users
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('🚀 813 Cafe Supabase Setup');
  console.log('========================\n');

  console.log('This script will help you set up your Supabase database for the 813 Cafe coworking system.\n');

  const supabaseUrl = await question('Enter your Supabase URL (e.g., https://your-project.supabase.co): ');
  const supabaseKey = await question('Enter your Supabase Anon Key: ');

  console.log('\n📝 Creating .env file...');
  
  const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Optional: For development
VITE_APP_ENV=development`;

  const fs = require('fs');
  fs.writeFileSync('.env', envContent);
  
  console.log('✅ .env file created successfully!');
  
  console.log('\n📋 Next steps:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Copy and paste the contents of database-schema.sql');
  console.log('4. Run the SQL to create tables and demo data');
  console.log('5. Go to Authentication → Users and create demo users:');
  console.log('   - hey@813cafe.com (admin)');
  console.log('   - john@example.com (member)');
  console.log('   - sarah@example.com (member)');
  console.log('6. Set passwords for these users in the Supabase dashboard');
  console.log('7. Run: npm run dev');
  console.log('8. Go to http://localhost:8081/auth and test login');
  
  console.log('\n🎉 Setup complete! Check SUPABASE_SETUP.md for detailed instructions.');
  
  rl.close();
}

setup().catch(console.error);
