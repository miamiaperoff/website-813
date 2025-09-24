// Data Models for 813 Cafe Coworking System

export interface Member {
  id: string;
  email: string;
  name: string;
  planId: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Plan {
  id: string;
  name: string;
  term: string;
  perks: string[];
}

export interface Subscription {
  id: string;
  memberId: string;
  status: 'pending' | 'active' | 'canceled';
}

export interface SubscriptionPeriod {
  id: string;
  memberId: string;
  periodStart: string;
  periodEnd: string;
  isPaid: boolean;
  markedBy: string;
  markedAt: string;
  note?: string;
}

export interface Session {
  id: string;
  memberId: string;
  code: string;
  startedAt: string;
  endedAt?: string;
}

export interface Desk {
  id: string;
  label: string;
  memberId?: string;
}

export interface Reservation {
  id: string;
  memberId: string;
  date: string;
  start: string;
  end: string;
  status: 'active' | 'cancelled' | 'completed';
}

export interface GuestPass {
  id: string;
  memberId: string;
  issuedAt: string;
  usedAt?: string;
  code: string;
}

export interface DrinkRedemption {
  id: string;
  memberId: string;
  cashier: string;
  redeemedAt: string;
  voucherId: string;
  voided?: boolean;
  voidReason?: string;
}

export interface Ticket {
  id: string;
  memberId: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved';
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  memberId: string;
  role: 'manager' | 'front-desk' | 'cafe' | 'facilities';
}

export interface PolicySettings {
  idleTimeout: number; // minutes
  lockoutThreshold: number; // attempts
  capacity: number; // max members
  fridaySlotSize: number; // hours
  graceLabelText: string;
}

export interface AttemptLog {
  id: string;
  memberId: string;
  code: string;
  attemptedAt: string;
  success: boolean;
  ipAddress?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'staff';
  isActive: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MemberSession {
  id: string;
  memberId: string;
  code: string;
  startedAt: string;
  endedAt?: string;
  isActive: boolean;
  attempts: number;
  lockedUntil?: string;
}
