import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nfjcsmxdezglsvhafjlg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mamNzbXhkZXpnbHN2aGFmamxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODc3NjksImV4cCI6MjA3MTQ2Mzc2OX0.4Ceu9fFD15MC0mRGoKAUbOqExykwC6lAVfygwzRZCSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  MEMBERS: 'members',
  PLANS: 'plans',
  SUBSCRIPTIONS: 'subscriptions',
  SUBSCRIPTION_PERIODS: 'subscription_periods',
  SESSIONS: 'sessions',
  DESKS: 'desks',
  RESERVATIONS: 'reservations',
  GUEST_PASSES: 'guest_passes',
  DRINK_REDEMPTIONS: 'drink_redemptions',
  TICKETS: 'tickets',
  ROLES: 'roles',
  POLICY_SETTINGS: 'policy_settings',
  ATTEMPT_LOGS: 'attempt_logs'
} as const;
