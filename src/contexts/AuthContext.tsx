'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'employee';
  companyId: string;
  department?: string;
  phoneNumber?: string;
  profileImageURL?: string;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  birthday?: Date;
  employeeId?: string;
}

interface CompanySettings {
  enableDeviationReporting?: boolean;
  enableRiskAnalysis?: boolean;
  enableDocumentArchive?: boolean;
  enableInternalControl?: boolean;
  enableChat?: boolean;
  enableBirthdayCalendar?: boolean;
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
}

interface Company {
  id: string;
  name: string;
  industry: string;
  employees: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  isActive: boolean;
  createdAt: Date;
  settings?: CompanySettings;
}

interface AuthContextType {
  currentUser: User | null;
  adminUser: User | null;
  selectedCompany: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setSelectedCompany: (company: Company) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompanyState] = useState<Company | null>(null);

  // Mock admin user data
  const mockAdminUser: User = {
    id: '1',
    email: 'admin@driftpro.no',
    firstName: 'Alexander',
    lastName: 'Pierce',
    role: 'admin',
    companyId: '1',
    department: 'Administrasjon',
    phoneNumber: '+47 123 45 678',
    isActive: true,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    employeeId: 'EMP001'
  };

  const login = async (email: string, password: string) => {
    // Mock login - replace with real Firebase auth
    if (email === 'admin@driftpro.no' && password === 'admin123') {
      setCurrentUser(mockAdminUser);
      setAdminUser(mockAdminUser);
      
      // Set default company if none selected
      if (!selectedCompany) {
        const defaultCompany: Company = {
          id: '1',
          name: 'DriftPro AS',
          industry: 'Teknologi',
          employees: 150,
          address: 'Oslo, Norway',
          phone: '+47 22 12 34 56',
          email: 'info@driftpro.no',
          website: 'www.driftpro.no',
          isActive: true,
          createdAt: new Date()
        };
        setSelectedCompanyState(defaultCompany);
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminUser(null);
    setSelectedCompanyState(null);
  };

  const setSelectedCompany = (company: Company) => {
    setSelectedCompanyState(company);
  };

  // Check for existing session on mount
  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('driftpro_user');
    const savedCompany = localStorage.getItem('driftpro_company');
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setAdminUser(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
    
    if (savedCompany) {
      try {
        const company = JSON.parse(savedCompany);
        setSelectedCompanyState(company);
      } catch (error) {
        console.error('Error parsing saved company:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('driftpro_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('driftpro_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedCompany) {
      localStorage.setItem('driftpro_company', JSON.stringify(selectedCompany));
    } else {
      localStorage.removeItem('driftpro_company');
    }
  }, [selectedCompany]);

  const value = {
    currentUser,
    adminUser,
    selectedCompany,
    login,
    logout,
    setSelectedCompany
  };

  return (
    <AuthContext.Provider value={value}>
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