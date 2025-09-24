-- 813 Cafe Coworking System Database Schema (Minimal)
-- Run this in your Supabase SQL editor

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  term VARCHAR(100) NOT NULL,
  perks TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'canceled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription periods table
CREATE TABLE IF NOT EXISTS subscription_periods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  marked_by VARCHAR(255) NOT NULL,
  marked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  code VARCHAR(6) NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desks table
CREATE TABLE IF NOT EXISTS desks (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy settings table
CREATE TABLE IF NOT EXISTS policy_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idle_timeout INTEGER DEFAULT 90,
  lockout_threshold INTEGER DEFAULT 5,
  capacity INTEGER DEFAULT 13,
  friday_slot_size INTEGER DEFAULT 15,
  grace_label_text VARCHAR(255) DEFAULT 'Payment grace period',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plans
INSERT INTO plans (id, name, term, perks) VALUES
('flex', 'Flex Plan', 'Month-to-Month', '24/7 coworking access, Reserved desk (8PM-11AM), 1 free drink/day (up to ₱150), Fast WiFi & power'),
('save', 'Save Plan', '3 Months', '24/7 coworking access, Reserved desk (8PM-11AM), 1 free drink/day (up to ₱150), Fast WiFi & power, Bi-weekly member events'),
('growth', 'Growth Plan', '6 Months', '24/7 coworking access, Reserved desk (8PM-11AM), 1 free drink/day (up to ₱150), Fast WiFi & power, 1 guest day pass/week, Bi-weekly member events'),
('resident', 'Resident Plan', '12 Months', '24/7 coworking access, Reserved desk (8PM-11AM), 1 free drink/day (up to ₱150), Fast WiFi & power, 2 guest passes/week, 1 meeting room hour/month, Bi-weekly member events')
ON CONFLICT (id) DO NOTHING;

-- Insert default desks
INSERT INTO desks (id, label) VALUES
('desk1', 'Desk 1'),
('desk2', 'Desk 2'),
('desk3', 'Desk 3'),
('desk4', 'Desk 4'),
('desk5', 'Desk 5'),
('desk6', 'Desk 6'),
('desk7', 'Desk 7'),
('desk8', 'Desk 8'),
('desk9', 'Desk 9'),
('desk10', 'Desk 10'),
('desk11', 'Desk 11'),
('desk12', 'Desk 12'),
('desk13', 'Desk 13')
ON CONFLICT (id) DO NOTHING;

-- Insert default policy settings
INSERT INTO policy_settings (id, idle_timeout, lockout_threshold, capacity, friday_slot_size, grace_label_text) VALUES
(gen_random_uuid(), 90, 5, 13, 15, 'Payment grace period')
ON CONFLICT DO NOTHING;

-- Insert demo members
INSERT INTO members (id, email, name, plan_id, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'hey@813cafe.com', 'Ana Calubiran', 'resident', 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'john@example.com', 'John Doe', 'growth', 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', 'Sarah Wilson', 'flex', 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert demo subscriptions
INSERT INTO subscriptions (id, member_id, status) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'active'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'active')
ON CONFLICT DO NOTHING;

-- Insert demo subscription periods
INSERT INTO subscription_periods (id, member_id, period_start, period_end, is_paid, marked_by, note) VALUES
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW() + INTERVAL '30 days', TRUE, 'hey@813cafe.com', 'Payment received'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW() + INTERVAL '30 days', TRUE, 'hey@813cafe.com', 'Payment received'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW() + INTERVAL '30 days', FALSE, 'hey@813cafe.com', 'Payment pending')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_sessions_member_id ON sessions(member_id);
CREATE INDEX IF NOT EXISTS idx_sessions_code ON sessions(code);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_subscription_periods_member_id ON subscription_periods(member_id);
CREATE INDEX IF NOT EXISTS idx_subscription_periods_period ON subscription_periods(period_start, period_end);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic - allow all for now, customize as needed)
CREATE POLICY "Allow all operations for authenticated users" ON members FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON subscriptions FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON subscription_periods FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON policy_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON plans FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON desks FOR ALL USING (true);
