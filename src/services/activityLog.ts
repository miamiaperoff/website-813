export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'member';
  activity: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
  category: 'login' | 'voucher' | 'checkin' | 'system' | 'payment' | 'other';
}

export class ActivityLogService {
  private static readonly STORAGE_KEY = '813_activity_log';
  private static readonly MAX_ENTRIES = 1000; // Keep last 1000 entries

  static logActivity(
    userId: string,
    userName: string,
    userRole: 'admin' | 'member',
    activity: string,
    description: string,
    category: ActivityLogEntry['category'] = 'other',
    metadata?: Record<string, any>
  ): void {
    const entry: ActivityLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userName,
      userRole,
      activity,
      description,
      timestamp: new Date().toISOString(),
      metadata,
      category
    };

    const existingLogs = this.getActivityLogs();
    existingLogs.unshift(entry); // Add to beginning

    // Keep only the most recent entries
    const trimmedLogs = existingLogs.slice(0, this.MAX_ENTRIES);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedLogs));
  }

  static getActivityLogs(): ActivityLogEntry[] {
    try {
      const logs = localStorage.getItem(this.STORAGE_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Error reading activity logs:', error);
      return [];
    }
  }

  static getActivityLogsByUser(userId: string): ActivityLogEntry[] {
    const allLogs = this.getActivityLogs();
    return allLogs.filter(log => log.userId === userId);
  }

  static getActivityLogsByRole(role: 'admin' | 'member'): ActivityLogEntry[] {
    const allLogs = this.getActivityLogs();
    return allLogs.filter(log => log.userRole === role);
  }

  static getActivityStats(): {
    totalActivities: number;
    activitiesByCategory: Record<string, number>;
    activitiesByRole: Record<string, number>;
    recentActivities: ActivityLogEntry[];
    dailyStats: Record<string, number>;
  } {
    const allLogs = this.getActivityLogs();
    const last7Days = this.getLast7Days();

    const activitiesByCategory = allLogs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const activitiesByRole = allLogs.reduce((acc, log) => {
      acc[log.userRole] = (acc[log.userRole] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dailyStats = allLogs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      if (last7Days.includes(date)) {
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalActivities: allLogs.length,
      activitiesByCategory,
      activitiesByRole,
      recentActivities: allLogs.slice(0, 10),
      dailyStats
    };
  }

  private static getLast7Days(): string[] {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  }

  static clearOldLogs(daysToKeep: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const allLogs = this.getActivityLogs();
    const filteredLogs = allLogs.filter(log => 
      new Date(log.timestamp) > cutoffDate
    );
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredLogs));
  }

  // Helper methods for common activities
  static logLogin(userId: string, userName: string, userRole: 'admin' | 'member'): void {
    this.logActivity(
      userId,
      userName,
      userRole,
      'User Login',
      `${userName} logged into the ${userRole} portal`,
      'login'
    );
  }

  static logVoucherRedemption(userId: string, userName: string, voucherCode: string): void {
    this.logActivity(
      userId,
      userName,
      'member',
      'Voucher Redemption',
      `${userName} redeemed daily drink voucher: ${voucherCode}`,
      'voucher',
      { voucherCode }
    );
  }

  static logCheckIn(userId: string, userName: string): void {
    this.logActivity(
      userId,
      userName,
      'member',
      'Check In',
      `${userName} checked into the coworking space`,
      'checkin'
    );
  }

  static logCheckOut(userId: string, userName: string): void {
    this.logActivity(
      userId,
      userName,
      'member',
      'Check Out',
      `${userName} checked out of the coworking space`,
      'checkin'
    );
  }

  static logPayment(userId: string, userName: string, amount: number, description: string): void {
    this.logActivity(
      userId,
      userName,
      'member',
      'Payment',
      `${userName} made payment: ${description}`,
      'payment',
      { amount, description }
    );
  }
}
