import { supabase, TABLES } from './supabase';
import { 
  Member, 
  Plan, 
  Subscription, 
  SubscriptionPeriod, 
  Session, 
  Desk, 
  Reservation, 
  GuestPass, 
  DrinkRedemption, 
  Ticket, 
  Role, 
  PolicySettings,
  AttemptLog,
  MemberSession
} from './types';

class DatabaseService {
  // Member Management
  async getMembers(): Promise<Member[]> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getMember(id: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) return null;
    return data;
  }

  async createMember(member: Omit<Member, 'id'>): Promise<Member> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .insert(member)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    return data;
  }

  // Plan Management
  async getPlans(): Promise<Plan[]> {
    const { data, error } = await supabase
      .from(TABLES.PLANS)
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data || [];
  }

  async getPlan(id: string): Promise<Plan | null> {
    const { data, error } = await supabase
      .from(TABLES.PLANS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  }

  // Subscription Management
  async getSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getSubscriptionByMember(memberId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .select('*')
      .eq('member_id', memberId)
      .single();
    
    if (error) return null;
    return data;
  }

  async createSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .insert(subscription)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateSubscriptionStatus(id: string, status: 'pending' | 'active' | 'canceled'): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    return data;
  }

  // Subscription Period Management
  async getSubscriptionPeriods(): Promise<SubscriptionPeriod[]> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getCurrentPeriod(memberId: string): Promise<SubscriptionPeriod | null> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .select('*')
      .eq('member_id', memberId)
      .lte('period_start', now)
      .gte('period_end', now)
      .single();
    
    if (error) return null;
    return data;
  }

  async createSubscriptionPeriod(period: Omit<SubscriptionPeriod, 'id'>): Promise<SubscriptionPeriod> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .insert(period)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updatePeriodPayment(id: string, isPaid: boolean, markedBy: string, note?: string): Promise<SubscriptionPeriod | null> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .update({ 
        is_paid: isPaid, 
        marked_by: markedBy, 
        marked_at: new Date().toISOString(),
        note 
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    return data;
  }

  // Session Management
  generateSessionCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let code = '';
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return code;
  }

  async startSession(memberId: string): Promise<{ success: boolean; session?: MemberSession; error?: string }> {
    try {
      // Check if member has active subscription
      const subscription = await this.getSubscriptionByMember(memberId);
      if (!subscription || subscription.status !== 'active') {
        return { success: false, error: 'No active subscription' };
      }

      // Check if current period is paid
      const currentPeriod = await this.getCurrentPeriod(memberId);
      if (!currentPeriod || !currentPeriod.isPaid) {
        return { success: false, error: 'Current period is not paid. Please contact support.' };
      }

      // Check if member is already in a session
      const activeSession = await this.getActiveSessionByMember(memberId);
      if (activeSession) {
        return { success: false, error: 'You are already in an active session' };
      }

      // Check capacity
      const activeSessions = await this.getActiveSessions();
      const policySettings = await this.getPolicySettings();
      if (activeSessions.length >= policySettings.capacity) {
        return { success: false, error: 'Space is at capacity (13 members). Please try again later.' };
      }

      const code = this.generateSessionCode();
      const newSession = {
        member_id: memberId,
        code,
        is_active: true,
        attempts: 0
      };

      const { data, error } = await supabase
        .from(TABLES.SESSIONS)
        .insert(newSession)
        .select()
        .single();
      
      if (error) throw error;

      return { success: true, session: data };
    } catch (error) {
      return { success: false, error: 'Failed to start session' };
    }
  }

  async endSession(sessionId: string, reason: 'manual' | 'timeout' = 'manual'): Promise<{ success: boolean; session?: MemberSession }> {
    try {
      const { data, error } = await supabase
        .from(TABLES.SESSIONS)
        .update({ 
          is_active: false, 
          ended_at: new Date().toISOString() 
        })
        .eq('id', sessionId)
        .select()
        .single();
      
      if (error) return { success: false };
      return { success: true, session: data };
    } catch (error) {
      return { success: false };
    }
  }

  async getActiveSessions(): Promise<MemberSession[]> {
    const { data, error } = await supabase
      .from(TABLES.SESSIONS)
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data || [];
  }

  async getActiveSessionByMember(memberId: string): Promise<MemberSession | null> {
    const { data, error } = await supabase
      .from(TABLES.SESSIONS)
      .select('*')
      .eq('member_id', memberId)
      .eq('is_active', true)
      .single();
    
    if (error) return null;
    return data;
  }

  async validateSessionCode(code: string): Promise<{ success: boolean; session?: MemberSession; error?: string }> {
    const { data, error } = await supabase
      .from(TABLES.SESSIONS)
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();
    
    if (error) return { success: false, error: 'Invalid or expired session code' };
    return { success: true, session: data };
  }

  async recordAttempt(memberId: string, code: string, success: boolean, ipAddress?: string): Promise<void> {
    const attempt = {
      member_id: memberId,
      code,
      success,
      ip_address: ipAddress
    };

    await supabase.from(TABLES.ATTEMPT_LOGS).insert(attempt);
  }

  // Desk Management
  async getDesks(): Promise<Desk[]> {
    const { data, error } = await supabase
      .from(TABLES.DESKS)
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data || [];
  }

  async assignDesk(deskId: string, memberId: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.DESKS)
      .update({ member_id: memberId })
      .eq('id', deskId);
    
    return !error;
  }

  async unassignDesk(deskId: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.DESKS)
      .update({ member_id: null })
      .eq('id', deskId);
    
    return !error;
  }

  // Policy Settings
  async getPolicySettings(): Promise<PolicySettings> {
    const { data, error } = await supabase
      .from(TABLES.POLICY_SETTINGS)
      .select('*')
      .single();
    
    if (error) {
      // Return default settings if none exist
      return {
        idleTimeout: 90,
        lockoutThreshold: 5,
        capacity: 13,
        fridaySlotSize: 15,
        graceLabelText: 'Payment grace period'
      };
    }
    
    return {
      idleTimeout: data.idle_timeout,
      lockoutThreshold: data.lockout_threshold,
      capacity: data.capacity,
      fridaySlotSize: data.friday_slot_size,
      graceLabelText: data.grace_label_text
    };
  }

  async updatePolicySettings(settings: Partial<PolicySettings>): Promise<PolicySettings> {
    const updateData = {
      idle_timeout: settings.idleTimeout,
      lockout_threshold: settings.lockoutThreshold,
      capacity: settings.capacity,
      friday_slot_size: settings.fridaySlotSize,
      grace_label_text: settings.graceLabelText
    };

    const { data, error } = await supabase
      .from(TABLES.POLICY_SETTINGS)
      .upsert(updateData)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      idleTimeout: data.idle_timeout,
      lockoutThreshold: data.lockout_threshold,
      capacity: data.capacity,
      fridaySlotSize: data.friday_slot_size,
      graceLabelText: data.grace_label_text
    };
  }

  // Check if it's Members-Only Hours (8PM-11AM, except Fridays)
  isMembersOnlyHours(): boolean {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 5 = Friday
    
    // Friday is not Members-Only
    if (day === 5) return false;
    
    // 8PM-11AM (20:00-11:00)
    return hour >= 20 || hour < 11;
  }

  // Get current time in Asia/Manila timezone
  getManilaTime(): Date {
    return new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"}));
  }
}

export const databaseService = new DatabaseService();
