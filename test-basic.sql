-- Basic test to check Supabase connection
-- Run this first to make sure everything works

-- Test 1: Create a simple table
CREATE TABLE IF NOT EXISTS test_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test 2: Insert some data
INSERT INTO test_table (name) VALUES 
('Test 1'),
('Test 2'),
('Test 3')
ON CONFLICT DO NOTHING;

-- Test 3: Query the data
SELECT * FROM test_table;
