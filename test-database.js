#!/usr/bin/env node

/**
 * Test script to verify Supabase connection and set up database
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://nfjcsmxdezglsvhafjlg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mamNzbXhkZXpnbHN2aGFmamxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODc3NjksImV4cCI6MjA3MTQ2Mzc2OX0.4Ceu9fFD15MC0mRGoKAUbOqExykwC6lAVfygwzRZCSk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase.from('members').select('count').limit(1);
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  }
}

async function setupDatabase() {
  console.log('📋 Setting up database schema...');
  
  try {
    // Read the schema file
    const schema = fs.readFileSync('database-schema.sql', 'utf8');
    
    // Split into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.log(`⚠️  Statement ${i + 1} had an issue:`, error.message);
          // Continue with other statements
        }
      }
    }
    
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.log('❌ Database setup failed:', error.message);
    console.log('📖 Please run the SQL manually in your Supabase dashboard');
  }
}

async function main() {
  console.log('🚀 813 Cafe Database Setup');
  console.log('==========================\n');
  
  const connected = await testConnection();
  
  if (connected) {
    await setupDatabase();
  } else {
    console.log('\n📖 Please check your Supabase configuration and try again.');
    console.log('See SUPABASE_SETUP.md for detailed instructions.');
  }
}

main().catch(console.error);
