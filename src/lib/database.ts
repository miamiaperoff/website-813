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
  // Helper to convert database row to Member type
  private mapMemberRow(row: any): Member {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      planId: row.plan_id,
      status: row.status,
      notes: row.notes
    };
  }

  // Member Management
  async getMembers(): Promise<Member[]> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(row => this.mapMemberRow(row));
  }

  async getMember(id: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return this.mapMemberRow(data);
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) return null;
    return this.mapMemberRow(data);
  }

  async createMember(member: Omit<Member, 'id'>): Promise<Member> {
    // Convert camelCase to snake_case for database
    const dbMember = {
      name: member.name,
      email: member.email,
      plan_id: member.planId,
      status: member.status,
      notes: member.notes
    };
    
    const { data, error } = await supabase
      .from(TABLES.MEMBERS)
      .insert(dbMember)
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert snake_case back to camelCase
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      planId: data.plan_id,
      status: data.status,
      notes: data.notes
    };
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

  async deleteMember(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.MEMBERS)
      .delete()
      .eq('id', id);
    
    return !error;
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

  // Helper to convert subscription period row to SubscriptionPeriod type
  private mapSubscriptionPeriodRow(row: any): SubscriptionPeriod {
    return {
      id: row.id,
      memberId: row.member_id,
      periodStart: row.period_start,
      periodEnd: row.period_end,
      isPaid: row.is_paid,
      markedBy: row.marked_by,
      markedAt: row.marked_at,
      note: row.note
    };
  }

  // Subscription Period Management
  async getSubscriptionPeriods(): Promise<SubscriptionPeriod[]> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(row => this.mapSubscriptionPeriodRow(row));
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
    return this.mapSubscriptionPeriodRow(data);
  }

  async createSubscriptionPeriod(period: Omit<SubscriptionPeriod, 'id'>): Promise<SubscriptionPeriod> {
    // Convert camelCase to snake_case for database
    const dbPeriod = {
      member_id: period.memberId,
      period_start: period.periodStart,
      period_end: period.periodEnd,
      is_paid: period.isPaid,
      marked_by: period.markedBy,
      marked_at: period.markedAt,
      note: period.note
    };
    
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .insert(dbPeriod)
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert snake_case back to camelCase
    return this.mapSubscriptionPeriodRow(data);
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
    return this.mapSubscriptionPeriodRow(data);
  }

  async updateSubscriptionPeriod(id: string, updates: {
    periodStart?: string;
    periodEnd?: string;
    isPaid?: boolean;
    markedBy?: string;
    note?: string;
  }): Promise<SubscriptionPeriod | null> {
    const dbUpdates: any = {};
    if (updates.periodStart !== undefined) dbUpdates.period_start = updates.periodStart;
    if (updates.periodEnd !== undefined) dbUpdates.period_end = updates.periodEnd;
    if (updates.isPaid !== undefined) dbUpdates.is_paid = updates.isPaid;
    if (updates.markedBy !== undefined) dbUpdates.marked_by = updates.markedBy;
    if (updates.note !== undefined) dbUpdates.note = updates.note;
    if (updates.markedBy || updates.isPaid !== undefined) {
      dbUpdates.marked_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    
    // Convert snake_case to camelCase
    return this.mapSubscriptionPeriodRow(data);
  }

  async getSubscriptionPeriodsByMember(memberId: string): Promise<SubscriptionPeriod[]> {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTION_PERIODS)
      .select('*')
      .eq('member_id', memberId)
      .order('period_start', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(row => this.mapSubscriptionPeriodRow(row));
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

  // Helper to convert drink redemption row to DrinkRedemption type
  private mapDrinkRedemptionRow(row: any): DrinkRedemption {
    return {
      id: row.id,
      memberId: row.member_id,
      voucherId: row.voucher_id,
      amount: row.amount,
      redeemedAt: row.redeemed_at,
      cashier: row.cashier,
      voided: row.voided || false
    };
  }

  // Drink Redemption Management
  async getMemberDrinkRedemptions(memberId: string, dateFrom?: string, dateTo?: string): Promise<DrinkRedemption[]> {
    let query = supabase
      .from(TABLES.DRINK_REDEMPTIONS)
      .select('*')
      .eq('member_id', memberId)
      .eq('voided', false)
      .order('redeemed_at', { ascending: false });

    if (dateFrom) {
      query = query.gte('redeemed_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('redeemed_at', dateTo);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []).map(row => this.mapDrinkRedemptionRow(row));
  }

  async canRedeemVoucherToday(memberId: string): Promise<boolean> {
    // Get Manila time for today's date
    const manilaTime = this.getManilaTime();
    const todayStart = new Date(manilaTime);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(manilaTime);
    todayEnd.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from(TABLES.DRINK_REDEMPTIONS)
      .select('id')
      .eq('member_id', memberId)
      .eq('voided', false)
      .gte('redeemed_at', todayStart.toISOString())
      .lte('redeemed_at', todayEnd.toISOString())
      .limit(1);

    if (error) return false;
    return !data || data.length === 0;
  }

  // Helper to convert drink redemption row to DrinkRedemption type
  private mapDrinkRedemptionRow(row: any): DrinkRedemption {
    return {
      id: row.id,
      memberId: row.member_id,
      voucherId: row.voucher_id,
      amount: row.amount,
      redeemedAt: row.redeemed_at,
      cashier: row.cashier,
      voided: row.voided || false
    };
  }

  async createDrinkRedemption(redemption: Omit<DrinkRedemption, 'id' | 'voucherId'>): Promise<DrinkRedemption> {
    const voucherId = `VOUCHER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Convert camelCase to snake_case for database
    const redemptionData = {
      member_id: redemption.memberId,
      voucher_id: voucherId,
      amount: redemption.amount,
      redeemed_at: redemption.redeemedAt,
      cashier: redemption.cashier,
      voided: redemption.voided || false
    };

    const { data, error } = await supabase
      .from(TABLES.DRINK_REDEMPTIONS)
      .insert(redemptionData)
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert snake_case back to camelCase
    return this.mapDrinkRedemptionRow(data);
  }
}

export const databaseService = new DatabaseService();
