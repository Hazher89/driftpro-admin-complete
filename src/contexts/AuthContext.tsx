'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { Company, User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  adminUser: User | null;
  selectedCompany: Company | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  selectCompany: (company: Company) => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if Firebase is properly initialized
  useEffect(() => {
    if (!auth || !db) {
      setError('Firebase er ikke riktig konfigurert. Kontakt administrator.');
      setLoading(false);
      return;
    }

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Convert Firebase user to our User type
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          firstName: firebaseUser.displayName?.split(' ')[0] || '',
          lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
          role: 'admin', // Default to admin for now
          companyId: '',
          departmentId: '',
          isActive: true,
          permissions: ['read', 'write', 'admin'],
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
          profileImageURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber || '',
          position: 'System Administrator'
        };
        
        setCurrentUser(user);
        setAdminUser(user);
      } else {
        setCurrentUser(null);
        setAdminUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!auth) {
      setError('Firebase Authentication er ikke tilgjengelig');
      return false;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return !!userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    if (!auth) {
      setError('Firebase Authentication er ikke tilgjengelig');
      return;
    }

    try {
      await signOut(auth);
      setCurrentUser(null);
      setAdminUser(null);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const selectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#3c8dbc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
          <p>Laster...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#721c24'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          maxWidth: '500px'
        }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
          <h2 style={{ margin: '0 0 20px 0' }}>Feil</h2>
          <p style={{ margin: '0' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      adminUser,
      selectedCompany,
      login,
      logout,
      selectCompany,
      loading,
      error
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