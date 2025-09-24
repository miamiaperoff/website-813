import { User, AuthState } from './types';
import { supabase } from './supabase';

// Real authentication service using Supabase
class AuthService {
  private currentUser: User | null = null;
  private listeners: ((state: AuthState) => void)[] = [];

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Use Supabase Auth for real authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Authentication failed' };
      }

      // Get user profile from our members table
      const { data: member, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('email', email)
        .single();

      if (memberError || !member) {
        return { success: false, error: 'User profile not found' };
      }

      // Create user object
      const user: User = {
        id: member.id,
        email: member.email,
        name: member.name,
        role: member.email === 'hey@813cafe.com' ? 'admin' : 'member',
        isActive: member.status === 'active',
        createdAt: member.created_at
      };

      this.currentUser = user;
      this.notifyListeners();
      
      // Store in localStorage for persistence
      localStorage.setItem('813cafe_user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  async logout(): Promise<void> {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    this.currentUser = null;
    localStorage.removeItem('813cafe_user');
    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const stored = localStorage.getItem('813cafe_user');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      } catch (error) {
        localStorage.removeItem('813cafe_user');
      }
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    const state: AuthState = {
      user: this.currentUser,
      isAuthenticated: this.currentUser !== null,
      isLoading: false
    };

    this.listeners.forEach(listener => listener(state));
  }

  // Check if user has admin privileges
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Check if user has staff privileges
  isStaff(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin' || user?.role === 'staff';
  }
}

export const authService = new AuthService();
