# Supabase Setup Guide for 813 Cafe

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `813-cafe-coworking`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your location
5. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy the following values:
   - Project URL (e.g., `https://your-project-id.supabase.co`)
   - Anon public key (starts with `eyJ...`)

## 3. Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

## 4. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `database-schema.sql` and paste it into the SQL editor
4. Click "Run" to execute the schema

This will create all the necessary tables and insert demo data.

## 5. Set Up Authentication

1. Go to "Authentication" → "Settings" in your Supabase dashboard
2. Under "Auth Providers", make sure "Email" is enabled
3. Under "User Management", you can add users manually or they can sign up

## 6. Create Demo Users

You can create demo users in two ways:

### Option A: Through Supabase Dashboard
1. Go to "Authentication" → "Users"
2. Click "Add user"
3. Create users with these emails:
   - `hey@813cafe.com` (admin)
   - `john@example.com` (member)
   - `sarah@example.com` (member)

### Option B: Through SQL (if you want to set passwords)
```sql
-- This will create auth users (you'll need to set passwords in the dashboard)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'hey@813cafe.com', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'john@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW());
```

## 7. Test Your Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:8081/auth`
3. Try logging in with the demo credentials:
   - Admin: `hey@813cafe.com` / `admin123`
   - Member: `john@example.com` / `password123`

## 8. Production Considerations

For production deployment:

1. **Security**: Update Row Level Security (RLS) policies to be more restrictive
2. **Environment**: Use production Supabase project with proper environment variables
3. **Backups**: Set up automated database backups
4. **Monitoring**: Enable Supabase monitoring and alerts
5. **SSL**: Ensure your production domain uses HTTPS

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your `.env` file has the correct Supabase URL and anon key
2. **"User not found"**: Make sure you've created the users in Supabase Auth
3. **Database errors**: Ensure you've run the schema SQL in your Supabase project
4. **CORS issues**: Check your Supabase project settings for allowed origins

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check the browser console for detailed error messages
