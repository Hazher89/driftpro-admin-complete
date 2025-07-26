import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  orderBy
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { db, auth } from './firebase';

export interface Company {
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
  settings?: {
    enableDeviationReporting?: boolean;
    enableRiskAnalysis?: boolean;
    enableDocumentArchive?: boolean;
    enableInternalControl?: boolean;
    enableChat?: boolean;
    enableBirthdayCalendar?: boolean;
    maxFileSizeMB?: number;
    allowedFileTypes?: string[];
  };
}

export interface User {
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

export class FirebaseService {
  // Company methods
  static async searchCompanies(searchTerm: string): Promise<Company[]> {
    if (!db) {
      console.error('Firebase not initialized - db is null');
      console.log('Firebase config check:', {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'MISSING',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'SET' : 'MISSING'
      });
      return [];
    }

    try {
      const companiesRef = collection(db, 'companies');
      // Forenklet spørring uten sammensatte filtre for å unngå index-problemer
      const q = query(companiesRef);
      
      const querySnapshot = await getDocs(q);
      const companies: Company[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Filtrer på klient-siden for å unngå index-problemer
        if (data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.industry?.toLowerCase().includes(searchTerm.toLowerCase())) {
          companies.push({
            id: doc.id,
            name: data.name || 'Ukjent bedrift',
            industry: data.industry || 'Generell',
            employees: data.employees || 0,
            address: data.address || '',
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            isActive: data.isActive !== false, // Default to true if not specified
            createdAt: data.createdAt?.toDate() || new Date(),
            settings: data.settings || {
              enableDeviationReporting: true,
              enableRiskAnalysis: true,
              enableDocumentArchive: true,
              enableInternalControl: true,
              enableChat: true,
              enableBirthdayCalendar: true,
              maxFileSizeMB: 10,
              allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
            }
          } as Company);
        }
      });
      
      // Hvis ingen bedrifter funnet, legg til test-data
      if (companies.length === 0) {
        console.log('No companies found in database, adding test data...');
        await this.addTestCompanies();
        
        // Søk igjen etter at test-data er lagt til
        const newQuerySnapshot = await getDocs(q);
        newQuerySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              data.industry?.toLowerCase().includes(searchTerm.toLowerCase())) {
            companies.push({
              id: doc.id,
              name: data.name || 'Ukjent bedrift',
              industry: data.industry || 'Generell',
              employees: data.employees || 0,
              address: data.address || '',
              phone: data.phone || '',
              email: data.email || '',
              website: data.website || '',
              isActive: data.isActive !== false, // Default to true if not specified
              createdAt: data.createdAt?.toDate() || new Date(),
              settings: data.settings || {
                enableDeviationReporting: true,
                enableRiskAnalysis: true,
                enableDocumentArchive: true,
                enableInternalControl: true,
                enableChat: true,
                enableBirthdayCalendar: true,
                maxFileSizeMB: 10,
                allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
              }
            } as Company);
          }
        });
      }
      
      return companies;
    } catch (error) {
      console.error('Error searching companies:', error);
      return [];
    }
  }

  static async getCompanyById(companyId: string): Promise<Company | null> {
    if (!db) {
      console.warn('Firebase not initialized');
      return null;
    }

    try {
      const companyDoc = await getDoc(doc(db, 'companies', companyId));
      if (companyDoc.exists()) {
        const data = companyDoc.data();
        return {
          id: companyDoc.id,
          name: data.name || 'Ukjent bedrift',
          industry: data.industry || 'Generell',
          employees: data.employees || 0,
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate() || new Date(),
          settings: data.settings || {
            enableDeviationReporting: true,
            enableRiskAnalysis: true,
            enableDocumentArchive: true,
            enableInternalControl: true,
            enableChat: true,
            enableBirthdayCalendar: true,
            maxFileSizeMB: 10,
            allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
          }
        } as Company;
      }
      return null;
    } catch (error) {
      console.error('Error getting company:', error);
      return null;
    }
  }

  static async getCompaniesByIndustry(industry: string): Promise<Company[]> {
    if (!db) {
      console.warn('Firebase not initialized');
      return [];
    }

    try {
      const companiesRef = collection(db, 'companies');
      const q = query(
        companiesRef,
        where('industry', '==', industry),
        where('isActive', '==', true),
        orderBy('name')
      );
      
      const querySnapshot = await getDocs(q);
      const companies: Company[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        companies.push({
          id: doc.id,
          name: data.name || 'Ukjent bedrift',
          industry: data.industry || 'Generell',
          employees: data.employees || 0,
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate() || new Date(),
          settings: data.settings || {
            enableDeviationReporting: true,
            enableRiskAnalysis: true,
            enableDocumentArchive: true,
            enableInternalControl: true,
            enableChat: true,
            enableBirthdayCalendar: true,
            maxFileSizeMB: 10,
            allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
          }
        } as Company);
      });
      
      return companies;
    } catch (error) {
      console.error('Error getting companies by industry:', error);
      return [];
    }
  }

  // User methods
  static async getUserById(userId: string): Promise<User | null> {
    if (!db) {
      console.warn('Firebase not initialized');
      return null;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          id: userDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          birthday: data.birthday?.toDate()
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  static async getUsersByCompany(companyId: string): Promise<User[]> {
    if (!db) {
      console.warn('Firebase not initialized');
      return [];
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('companyId', '==', companyId),
        where('isActive', '==', true),
        orderBy('firstName')
      );
      
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          birthday: data.birthday?.toDate()
        } as User);
      });
      
      return users;
    } catch (error) {
      console.error('Error getting users by company:', error);
      return [];
    }
  }

  // Authentication methods
  static async login(email: string, password: string): Promise<FirebaseUser | null> {
    if (!auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  static async createUser(email: string, password: string, userData: Partial<User>): Promise<User | null> {
    if (!auth || !db) {
      throw new Error('Firebase not initialized');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const newUser: Omit<User, 'id'> = {
        email: user.email || email,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: userData.role || 'employee',
        companyId: userData.companyId || '',
        department: userData.department,
        phoneNumber: userData.phoneNumber,
        profileImageURL: userData.profileImageURL,
        isActive: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        birthday: userData.birthday,
        employeeId: userData.employeeId
      };
      
      const userDoc = await addDoc(collection(db, 'users'), newUser);
      return {
        id: userDoc.id,
        ...newUser
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Dashboard statistics
  static async getDashboardStats(companyId: string) {
    try {
      const users = await this.getUsersByCompany(companyId);
      const company = await this.getCompanyById(companyId);
      
      return {
        totalEmployees: users.length,
        activeEmployees: users.filter(u => u.isActive).length,
        departments: [...new Set(users.map(u => u.department).filter(Boolean))].length,
        companyName: company?.name || 'Unknown Company',
        recentActivity: users.filter(u => {
          const lastLogin = u.lastLoginAt;
          if (!lastLogin) return false;
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return lastLogin > oneWeekAgo;
        }).length
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return {
        totalEmployees: 0,
        activeEmployees: 0,
        departments: 0,
        companyName: 'Unknown Company',
        recentActivity: 0
      };
    }
  }

  static async addTestCompanies() {
    if (!db) {
      console.warn('Firebase not initialized');
      return;
    }

    try {
      const companiesRef = collection(db, 'companies');
      
      const testCompanies = [
        {
          name: 'DriftPro AS',
          industry: 'Teknologi',
          employees: 50,
          address: 'Storgata 1, 0001 Oslo',
          phone: '+47 123 45 678',
          email: 'kontakt@driftpro.no',
          website: 'https://driftpro.no',
          isActive: true,
          createdAt: new Date(),
          settings: {
            enableDeviationReporting: true,
            enableRiskAnalysis: true,
            enableDocumentArchive: true,
            enableInternalControl: true,
            enableChat: true,
            enableBirthdayCalendar: true,
            maxFileSizeMB: 10,
            allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png']
          }
        },
        {
          name: 'Teknisk Service Norge',
          industry: 'Service',
          employees: 25,
          address: 'Industriveien 15, 5000 Bergen',
          phone: '+47 987 65 432',
          email: 'info@tsn.no',
          website: 'https://tsn.no',
          isActive: true,
          createdAt: new Date(),
          settings: {
            enableDeviationReporting: true,
            enableRiskAnalysis: false,
            enableDocumentArchive: true,
            enableInternalControl: false,
            enableChat: true,
            enableBirthdayCalendar: false,
            maxFileSizeMB: 5,
            allowedFileTypes: ['pdf', 'doc', 'docx']
          }
        },
        {
          name: 'Industri Drift AS',
          industry: 'Industri',
          employees: 100,
          address: 'Fabrikkveien 42, 3000 Drammen',
          phone: '+47 555 12 345',
          email: 'post@industridrift.no',
          website: 'https://industridrift.no',
          isActive: true,
          createdAt: new Date(),
          settings: {
            enableDeviationReporting: true,
            enableRiskAnalysis: true,
            enableDocumentArchive: true,
            enableInternalControl: true,
            enableChat: true,
            enableBirthdayCalendar: true,
            maxFileSizeMB: 20,
            allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'xls', 'xlsx']
          }
        }
      ];

      for (const company of testCompanies) {
        await addDoc(companiesRef, company);
        console.log(`Added test company: ${company.name}`);
      }

      console.log('Test companies added successfully');
    } catch (error) {
      console.error('Error adding test companies:', error);
    }
  }
} 