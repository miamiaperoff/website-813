import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './auth';
import { AuthState, User } from './types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isStaff: () => boolean;
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
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Initialize auth state
    const user = authService.getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: user !== null,
      isLoading: false
    });

    // Subscribe to auth changes
    const unsubscribe = authService.subscribe((state) => {
      setAuthState(state);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    const result = await authService.login(email, password);
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    
    return result;
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await authService.logout();
  };

  const isAdmin = () => authService.isAdmin();
  const isStaff = () => authService.isStaff();

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    isAdmin,
    isStaff
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
