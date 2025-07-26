'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Company, User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  adminUser: User | null;
  selectedCompany: Company | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectCompany: (company: Company) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with real Firebase auth
    if (email === 'admin@driftpro.no' && password === 'admin123') {
      const user: User = {
        id: 'admin1',
        email: 'admin@driftpro.no',
        firstName: 'Admin',
        lastName: 'DriftPro',
        role: 'admin',
        companyId: '1',
        departmentId: 'dept1',
        isActive: true,
        permissions: ['read', 'write', 'admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        profileImageURL: null,
        phoneNumber: '+47 123 45 678',
        position: 'System Administrator'
      };
      
      setCurrentUser(user);
      setAdminUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminUser(null);
    setSelectedCompany(null);
  };

  const selectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      adminUser,
      selectedCompany,
      login,
      logout,
      selectCompany
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 