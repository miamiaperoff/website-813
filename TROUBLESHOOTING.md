# 🚨 Troubleshooting Supabase Setup

## Step 1: Test Basic Connection

First, run this simple test in your Supabase SQL Editor:

```sql
-- Basic test
SELECT 'Hello Supabase!' as message;
```

If this works, your connection is fine. If not, check your Supabase URL and key.

## Step 2: Test Table Creation

Run this in Supabase SQL Editor:

```sql
-- Create a simple test table
CREATE TABLE test_connection (
  id SERIAL PRIMARY KEY,
  message TEXT
);

-- Insert test data
INSERT INTO test_connection (message) VALUES ('Connection successful!');

-- Query the data
SELECT * FROM test_connection;
```

## Step 3: Check Your Supabase Project

1. **Go to your Supabase dashboard**
2. **Check if your project is active** (not paused)
3. **Verify the URL and key** in your project settings

## Step 4: Common Issues & Solutions

### ❌ "Permission denied" errors
- **Solution**: Make sure you're using the correct anon key
- **Check**: Go to Settings → API in your Supabase dashboard

### ❌ "Connection failed" errors
- **Solution**: Verify your Supabase URL is correct
- **Check**: Should look like `https://your-project-id.supabase.co`

### ❌ "Syntax error" errors
- **Solution**: Try the ultra-simple schema first
- **File**: Use `database-schema-ultra-simple.sql`

### ❌ "Table already exists" errors
- **Solution**: This is normal, the schema uses `CREATE TABLE IF NOT EXISTS`
- **Action**: You can ignore these warnings

## Step 5: Test Your App

After running the schema:

1. **Start your app**: `npm run dev`
2. **Check browser console** for any errors
3. **Go to**: `http://localhost:8081/auth`
4. **Try logging in** with demo credentials

## Step 6: Debug Authentication

If login doesn't work:

1. **Check browser console** for errors
2. **Verify Supabase connection** in Network tab
3. **Check if tables exist** in Supabase dashboard

## Step 7: Manual Table Check

Go to your Supabase dashboard → Table Editor and verify these tables exist:
- ✅ `members`
- ✅ `plans` 
- ✅ `subscriptions`
- ✅ `sessions`
- ✅ `desks`

## Step 8: Still Not Working?

Try this minimal approach:

1. **Delete all tables** in Supabase dashboard
2. **Run the ultra-simple schema**
3. **Test with just one table first**
4. **Gradually add more tables**

## 🆘 Need Help?

If you're still stuck, please share:
1. **The exact error message** you're seeing
2. **Which step** you're failing at
3. **Screenshot** of the error (if possible)

## 🎯 Quick Success Test

Run this in your Supabase SQL Editor:

```sql
-- Quick success test
SELECT 
  'Database connected!' as status,
  NOW() as timestamp,
  'Ready to go!' as message;
```

If this returns data, your database is working! 🎉
