'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Company } from '../types';

interface CompanySelectorProps {
  onCompanySelect: (company: Company) => void;
}

export default function CompanySelector({ onCompanySelect }: CompanySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock companies data
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'DriftPro AS',
      email: 'kontakt@driftpro.no',
      logoURL: null,
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      address: 'Storgata 1, 0001 Oslo',
      phoneNumber: '+47 123 45 678',
      website: 'https://driftpro.no',
      description: 'Ledende leverandør av drift og vedlikehold',
      adminUserId: 'admin1',
      isActive: true,
      subscriptionPlan: 'enterprise',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Vedlikehold Norge AS',
      email: 'info@vedlikehold.no',
      logoURL: null,
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      address: 'Karl Johans gate 10, 0154 Oslo',
      phoneNumber: '+47 987 65 432',
      website: 'https://vedlikehold.no',
      description: 'Profesjonell vedlikeholdstjeneste',
      adminUserId: 'admin2',
      isActive: true,
      subscriptionPlan: 'premium',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#3c8dbc',
          marginBottom: '10px'
        }}>
          DriftPro Admin Panel
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6c757d',
          marginBottom: '30px'
        }}>
          Velg din bedrift for å komme i gang
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <i className="fas fa-search" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            fontSize: '16px'
          }}></i>
          <input
            type="text"
            placeholder="Søk etter bedriftsnavn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 15px 15px 45px',
              border: '2px solid #dee2e6',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3c8dbc'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>
      </div>

      {filteredCompanies.length > 0 && (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => onCompanySelect(company)}
              style={{
                padding: '20px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                marginBottom: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3c8dbc';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(60, 141, 188, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#dee2e6';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3c8dbc, #5bc0de)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '24px',
                  boxShadow: '0 4px 8px rgba(60, 141, 188, 0.3)'
                }}>
                  {company.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {company.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 6px 0', 
                    fontSize: '14px', 
                    color: '#6c757d'
                  }}>
                    <i className="fas fa-envelope" style={{ marginRight: '6px' }}></i>
                    {company.email}
                  </p>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '13px', 
                    color: '#17a2b8',
                    fontWeight: '500'
                  }}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: '6px' }}></i>
                    {company.address}
                  </p>
                </div>
                <i className="fas fa-chevron-right" style={{ 
                  color: '#6c757d',
                  fontSize: '16px',
                  transition: 'transform 0.3s'
                }}></i>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm && filteredCompanies.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#6c757d'
        }}>
          <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '15px', opacity: '0.5' }}></i>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Ingen bedrifter funnet</h3>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Prøv å søke med et annet navn
          </p>
        </div>
      )}

      {!searchTerm && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#6c757d'
        }}>
          <i className="fas fa-building" style={{ fontSize: '48px', marginBottom: '15px', opacity: '0.5' }}></i>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Velg din bedrift</h3>
          <p style={{ margin: '0', fontSize: '14px' }}>
            Klikk på en bedrift for å logge inn
          </p>
        </div>
      )}
    </div>
  );
} 