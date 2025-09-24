-- Check what tables exist in your database
-- Run this in Supabase SQL Editor

-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check if we have data
SELECT 'members' as table_name, COUNT(*) as count FROM members
UNION ALL
SELECT 'plans' as table_name, COUNT(*) as count FROM plans
UNION ALL
SELECT 'subscriptions' as table_name, COUNT(*) as count FROM subscriptions
UNION ALL
SELECT 'desks' as table_name, COUNT(*) as count FROM desks;

-- Check demo members
SELECT id, email, name, plan_id, status FROM members;

-- Check demo plans
SELECT id, name, term FROM plans;
