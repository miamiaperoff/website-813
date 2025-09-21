import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActivityLogService } from '@/services/activityLog';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  memberTier?: 'flex' | 'save' | 'growth' | 'resident'; // Only for members
  joinDate: string;
  lastVisit?: string;
  totalHours?: number;
  drinkCreditsUsed?: number; // Track daily drink usage
  guestPassesUsed?: number; // Track guest pass usage
  qrCode?: string; // For check-in system (members only)
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  paymentStatus?: 'current' | 'overdue' | 'pending';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('member_token');
        if (token) {
          // In a real app, you'd validate the token with your backend
          // For now, we'll simulate a user session
          const userData = localStorage.getItem('member_user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('member_token');
        localStorage.removeItem('member_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication for different user types
      if (email === 'ana@813cafe.com' && password === 'admin123') {
        // Admin user
        const adminUser: User = {
          id: 'admin_1',
          email: 'ana@813cafe.com',
          name: 'Ana Calubiran',
          role: 'admin',
          joinDate: '2024-01-01',
          status: 'active'
        };
        
        const token = 'admin_jwt_token_' + Date.now();
        localStorage.setItem('member_token', token);
        localStorage.setItem('member_user', JSON.stringify(adminUser));
        setUser(adminUser);
        
        // Log admin login
        ActivityLogService.logLogin(adminUser.id, adminUser.name, 'admin');
        
        return true;
      } else if (email === 'member@813cafe.com' && password === 'password') {
        // Member user
        const memberUser: User = {
          id: '1',
          email: 'member@813cafe.com',
          name: 'John Doe',
          role: 'member',
          memberTier: 'growth',
          joinDate: '2024-01-15',
          lastVisit: new Date().toISOString(),
          totalHours: 45,
          drinkCreditsUsed: 0,
          guestPassesUsed: 0,
          qrCode: 'MEMBER_001',
          phone: '+63 912 345 6789',
          status: 'active',
          paymentStatus: 'current'
        };
        
        const token = 'member_jwt_token_' + Date.now();
        localStorage.setItem('member_token', token);
        localStorage.setItem('member_user', JSON.stringify(memberUser));
        setUser(memberUser);
        
        // Log member login
        ActivityLogService.logLogin(memberUser.id, memberUser.name, 'member');
        
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('member_token');
    localStorage.removeItem('member_user');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
    isAdmin,
    isMember
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
