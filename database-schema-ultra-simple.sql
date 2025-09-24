-- Ultra Simple Schema - Just the essentials
-- Run this in Supabase SQL Editor

-- Members table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plans table
CREATE TABLE plans (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  term VARCHAR(100) NOT NULL,
  perks TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  code VARCHAR(6) NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desks table
CREATE TABLE desks (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert plans
INSERT INTO plans (id, name, term, perks) VALUES
('flex', 'Flex Plan', 'Month-to-Month', 'Basic coworking access'),
('save', 'Save Plan', '3 Months', 'Basic coworking access + events'),
('growth', 'Growth Plan', '6 Months', 'Basic coworking access + events + guest passes'),
('resident', 'Resident Plan', '12 Months', 'Full access + meeting room + guest passes');

-- Insert desks
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
('desk13', 'Desk 13');

-- Insert demo members
INSERT INTO members (id, email, name, plan_id, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'hey@813cafe.com', 'Ana Calubiran', 'resident', 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'john@example.com', 'John Doe', 'growth', 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', 'Sarah Wilson', 'flex', 'active');

-- Insert demo subscriptions
INSERT INTO subscriptions (id, member_id, status) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'active'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'active');
