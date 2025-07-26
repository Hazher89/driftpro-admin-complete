'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

export default function CompanySelector() {
  const { setSelectedCompany } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with real Firebase data
  const companies: Company[] = [
    { 
      id: '1', 
      name: 'DriftPro AS', 
      industry: 'Teknologi', 
      employees: 150,
      isActive: true,
      createdAt: new Date()
    },
    { 
      id: '2', 
      name: 'Nordic Solutions', 
      industry: 'Konsulent', 
      employees: 75,
      isActive: true,
      createdAt: new Date()
    },
    { 
      id: '3', 
      name: 'TechCorp Norway', 
      industry: 'IT', 
      employees: 200,
      isActive: true,
      createdAt: new Date()
    },
    { 
      id: '4', 
      name: 'Innovation Labs', 
      industry: 'Forskning', 
      employees: 45,
      isActive: true,
      createdAt: new Date()
    },
    { 
      id: '5', 
      name: 'Digital Future', 
      industry: 'Software', 
      employees: 120,
      isActive: true,
      createdAt: new Date()
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompanySelect = (company: Company) => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setSelectedCompany(company);
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <i className="fas fa-search" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            fontSize: '14px'
          }}></i>
          <input
            type="text"
            placeholder="Søk etter bedrift..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3c8dbc'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredCompanies.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#6c757d'
          }}>
            <i className="fas fa-search" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
            <p>Ingen bedrifter funnet</p>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => handleCompanySelect(company)}
              style={{
                padding: '15px',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3c8dbc';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(60, 141, 188, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#dee2e6';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #3c8dbc, #5bc0de)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '18px'
                }}>
                  {company.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: '0 0 5px 0', 
                    fontSize: '16px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {company.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 3px 0', 
                    fontSize: '14px', 
                    color: '#6c757d'
                  }}>
                    {company.industry}
                  </p>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '12px', 
                    color: '#17a2b8'
                  }}>
                    {company.employees} ansatte
                  </p>
                </div>
                <i className="fas fa-chevron-right" style={{ 
                  color: '#6c757d',
                  fontSize: '14px'
                }}></i>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#3c8dbc'
        }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
          <p>Laster bedriftsdata...</p>
        </div>
      )}
    </div>
  );
} 