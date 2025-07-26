// Script to seed Firebase Firestore with test data
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCyE4S4B5q2JLdtaTtr8kVVvg8y-3Zm7ZE',
  authDomain: 'driftpro-40ccd.firebaseapp.com',
  projectId: 'driftpro-40ccd',
  storageBucket: 'driftpro-40ccd.firebasestorage.app',
  messagingSenderId: '137181225938',
  appId: '1:137181225938:ios:945515ac1dbb4bdbf4de0b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test companies data
const testCompanies = [
  {
    name: 'DriftPro Demo',
    email: 'admin@driftpro.no',
    logoURL: null,
    primaryColor: '#3c8dbc',
    secondaryColor: '#1e40af',
    address: 'Oslo, Norge',
    phoneNumber: '+47 123 45 678',
    website: 'https://driftpro.no',
    description: 'Demo bedrift for DriftPro Admin Panel',
    adminUserId: 'admin-user',
    isActive: true,
    subscriptionPlan: 'premium',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Test Bedrift AS',
    email: 'info@testbedrift.no',
    logoURL: null,
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    address: 'Bergen, Norge',
    phoneNumber: '+47 987 65 432',
    website: 'https://testbedrift.no',
    description: 'Test bedrift for utvikling og testing',
    adminUserId: 'test-admin',
    isActive: true,
    subscriptionPlan: 'basic',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Norsk Teknologi AS',
    email: 'kontakt@norskteknologi.no',
    logoURL: null,
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    address: 'Trondheim, Norge',
    phoneNumber: '+47 555 12 345',
    website: 'https://norskteknologi.no',
    description: 'Teknologibedrift med fokus på innovasjon',
    adminUserId: 'tech-admin',
    isActive: true,
    subscriptionPlan: 'enterprise',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedCompanies() {
  try {
    console.log('🌱 Starting to seed companies...');
    
    for (const company of testCompanies) {
      // Use a specific document ID for easier reference
      const docId = company.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      await setDoc(doc(db, 'companies', docId), company);
      console.log(`✅ Added company: ${company.name}`);
    }
    
    console.log('🎉 All companies seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding companies:', error);
  }
}

// Run the seeding
seedCompanies(); 