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
import { databaseService } from './database';

class DataService {
  // Member Management
  async getMembers(): Promise<Member[]> {
    return await databaseService.getMembers();
  }

  async getMember(id: string): Promise<Member | null> {
    return await databaseService.getMember(id);
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    return await databaseService.getMemberByEmail(email);
  }

  async createMember(member: Omit<Member, 'id'>): Promise<Member> {
    return await databaseService.createMember(member);
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
    return await databaseService.updateMember(id, updates);
  }

  // Plan Management
  async getPlans(): Promise<Plan[]> {
    return await databaseService.getPlans();
  }

  async getPlan(id: string): Promise<Plan | null> {
    return await databaseService.getPlan(id);
  }

  // Subscription Management
  async getSubscriptions(): Promise<Subscription[]> {
    return await databaseService.getSubscriptions();
  }

  async getSubscriptionByMember(memberId: string): Promise<Subscription | null> {
    return await databaseService.getSubscriptionByMember(memberId);
  }

  async createSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    return await databaseService.createSubscription(subscription);
  }

  async updateSubscriptionStatus(id: string, status: 'pending' | 'active' | 'canceled'): Promise<Subscription | null> {
    return await databaseService.updateSubscriptionStatus(id, status);
  }

  // Subscription Period Management
  async getSubscriptionPeriods(): Promise<SubscriptionPeriod[]> {
    return await databaseService.getSubscriptionPeriods();
  }

  async getCurrentPeriod(memberId: string): Promise<SubscriptionPeriod | null> {
    return await databaseService.getCurrentPeriod(memberId);
  }

  async createSubscriptionPeriod(period: Omit<SubscriptionPeriod, 'id'>): Promise<SubscriptionPeriod> {
    return await databaseService.createSubscriptionPeriod(period);
  }

  async updatePeriodPayment(id: string, isPaid: boolean, markedBy: string, note?: string): Promise<SubscriptionPeriod | null> {
    return await databaseService.updatePeriodPayment(id, isPaid, markedBy, note);
  }

  // Session Management
  async startSession(memberId: string): Promise<{ success: boolean; session?: MemberSession; error?: string }> {
    return await databaseService.startSession(memberId);
  }

  async endSession(sessionId: string, reason: 'manual' | 'timeout' = 'manual'): Promise<{ success: boolean; session?: MemberSession }> {
    return await databaseService.endSession(sessionId, reason);
  }

  async getActiveSessions(): Promise<MemberSession[]> {
    return await databaseService.getActiveSessions();
  }

  async getActiveSessionByMember(memberId: string): Promise<MemberSession | null> {
    return await databaseService.getActiveSessionByMember(memberId);
  }

  async validateSessionCode(code: string): Promise<{ success: boolean; session?: MemberSession; error?: string }> {
    return await databaseService.validateSessionCode(code);
  }

  async recordAttempt(memberId: string, code: string, success: boolean, ipAddress?: string): Promise<void> {
    return await databaseService.recordAttempt(memberId, code, success, ipAddress);
  }

  // Desk Management
  async getDesks(): Promise<Desk[]> {
    return await databaseService.getDesks();
  }

  async assignDesk(deskId: string, memberId: string): Promise<boolean> {
    return await databaseService.assignDesk(deskId, memberId);
  }

  async unassignDesk(deskId: string): Promise<boolean> {
    return await databaseService.unassignDesk(deskId);
  }

  // Policy Settings
  async getPolicySettings(): Promise<PolicySettings> {
    return await databaseService.getPolicySettings();
  }

  async updatePolicySettings(settings: Partial<PolicySettings>): Promise<PolicySettings> {
    return await databaseService.updatePolicySettings(settings);
  }

  // Utility Methods
  isMembersOnlyHours(): boolean {
    return databaseService.isMembersOnlyHours();
  }

  getManilaTime(): Date {
    return databaseService.getManilaTime();
  }

  // Additional methods for other features (reservations, guest passes, etc.)
  // These will be implemented as needed
  async getReservations(): Promise<Reservation[]> {
    // TODO: Implement reservations
    return [];
  }

  async createReservation(reservation: Omit<Reservation, 'id'>): Promise<Reservation | null> {
    // TODO: Implement reservation creation
    return null;
  }

  async getGuestPasses(): Promise<GuestPass[]> {
    // TODO: Implement guest passes
    return [];
  }

  async createGuestPass(guestPass: Omit<GuestPass, 'id'>): Promise<GuestPass | null> {
    // TODO: Implement guest pass creation
    return null;
  }

  async getDrinkRedemptions(): Promise<DrinkRedemption[]> {
    // TODO: Implement drink redemptions
    return [];
  }

  async createDrinkRedemption(redemption: Omit<DrinkRedemption, 'id'>): Promise<DrinkRedemption | null> {
    // TODO: Implement drink redemption creation
    return null;
  }

  async getTickets(): Promise<Ticket[]> {
    // TODO: Implement tickets
    return [];
  }

  async createTicket(ticket: Omit<Ticket, 'id'>): Promise<Ticket | null> {
    // TODO: Implement ticket creation
    return null;
  }

  async updateTicketStatus(id: string, status: 'open' | 'in-progress' | 'resolved'): Promise<Ticket | null> {
    // TODO: Implement ticket status update
    return null;
  }

  async getRoles(): Promise<Role[]> {
    // TODO: Implement roles
    return [];
  }

  async assignRole(memberId: string, role: 'manager' | 'front-desk' | 'cafe' | 'facilities'): Promise<Role | null> {
    // TODO: Implement role assignment
    return null;
  }
}

export const dataService = new DataService();