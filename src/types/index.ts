export interface Company {
  id: string;
  name: string;
  email: string;
  logoURL?: string | null;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  phoneNumber: string;
  website: string;
  description: string;
  adminUserId: string;
  isActive: boolean;
  subscriptionPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: string;
  departmentId: string;
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  profileImageURL?: string | null;
  phoneNumber: string;
  position: string;
} 