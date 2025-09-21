// Daily Voucher Reset Service
// This service handles the automatic reset of daily drink vouchers at 12:00 AM

export class DailyVoucherResetService {
  private static instance: DailyVoucherResetService;
  private resetInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeResetTimer();
  }

  public static getInstance(): DailyVoucherResetService {
    if (!DailyVoucherResetService.instance) {
      DailyVoucherResetService.instance = new DailyVoucherResetService();
    }
    return DailyVoucherResetService.instance;
  }

  private initializeResetTimer() {
    // Calculate time until next midnight
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Next midnight
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Set initial timeout for next midnight
    setTimeout(() => {
      this.performDailyReset();
      this.scheduleDailyReset(); // Schedule for every 24 hours after that
    }, timeUntilMidnight);

    // Check if we need to reset immediately (in case the app was closed during reset time)
    this.checkAndResetIfNeeded();
  }

  private scheduleDailyReset() {
    // Clear existing interval
    if (this.resetInterval) {
      clearInterval(this.resetInterval);
    }

    // Set interval for every 24 hours (86400000 ms)
    this.resetInterval = setInterval(() => {
      this.performDailyReset();
    }, 24 * 60 * 60 * 1000);
  }

  private checkAndResetIfNeeded() {
    const lastReset = localStorage.getItem('813_last_voucher_reset');
    const now = new Date();
    
    if (!lastReset) {
      // First time, set the reset time to now
      localStorage.setItem('813_last_voucher_reset', now.toISOString());
      return;
    }

    const lastResetDate = new Date(lastReset);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastResetDay = new Date(lastResetDate.getFullYear(), lastResetDate.getMonth(), lastResetDate.getDate());

    // If we're on a new day and it's past midnight, perform reset
    if (today > lastResetDay && now.getHours() >= 0) {
      this.performDailyReset();
    }
  }

  private performDailyReset() {
    console.log('Performing daily voucher reset...');
    
    try {
      // Clear all existing vouchers
      localStorage.removeItem('813_vouchers');
      localStorage.removeItem('813_pos_vouchers');
      localStorage.removeItem('813_recent_redemptions');
      
      // Reset member daily drink usage
      const members = JSON.parse(localStorage.getItem('813_members') || '[]');
      const updatedMembers = members.map((member: any) => ({
        ...member,
        drinksUsedToday: 0,
        lastVoucherReset: new Date().toISOString()
      }));
      localStorage.setItem('813_members', JSON.stringify(updatedMembers));

      // Update last reset time
      localStorage.setItem('813_last_voucher_reset', new Date().toISOString());

      // Log the reset
      console.log('Daily voucher reset completed successfully');
      
      // In a real application, you might want to:
      // 1. Send notifications to members about new vouchers
      // 2. Update a database
      // 3. Send analytics data
      // 4. Trigger other daily maintenance tasks

    } catch (error) {
      console.error('Error during daily voucher reset:', error);
    }
  }

  public getNextResetTime(): Date {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    return nextMidnight;
  }

  public getTimeUntilNextReset(): number {
    const now = new Date();
    const nextMidnight = this.getNextResetTime();
    return nextMidnight.getTime() - now.getTime();
  }

  public formatTimeUntilReset(): string {
    const timeUntilReset = this.getTimeUntilNextReset();
    const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  public destroy() {
    if (this.resetInterval) {
      clearInterval(this.resetInterval);
      this.resetInterval = null;
    }
  }
}

// Initialize the service when the module is imported
export const dailyVoucherReset = DailyVoucherResetService.getInstance();
