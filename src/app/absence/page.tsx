'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Absence {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sykdom' | 'ferie' | 'permisjon' | 'andre';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  createdAt: Date;
}

export default function AbsencePage() {
  const { selectedCompany } = useAuth();
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newAbsence, setNewAbsence] = useState({
    employeeId: '',
    employeeName: '',
    type: 'ferie' as 'sykdom' | 'ferie' | 'permisjon' | 'andre',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (selectedCompany) {
      fetchAbsences();
    }
  }, [selectedCompany]);

  async function fetchAbsences() {
    setLoading(true);
    try {
      // Mock data for now - replace with real Firebase call
      const mockAbsences: Absence[] = [
        {
          id: '1',
          employeeId: 'EMP001',
          employeeName: 'Admin DriftPro',
          type: 'ferie',
          startDate: '2024-07-15',
          endDate: '2024-07-22',
          status: 'approved',
          description: 'Sommerferie',
          createdAt: new Date('2024-07-01')
        },
        {
          id: '2',
          employeeId: 'EMP002',
          employeeName: 'Manager DriftPro',
          type: 'sykdom',
          startDate: '2024-07-20',
          endDate: '2024-07-25',
          status: 'approved',
          description: 'Forkjølelse',
          createdAt: new Date('2024-07-19')
        }
      ];
      setAbsences(mockAbsences);
    } catch (error: unknown) {
      console.error('Error fetching absences:', error);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fravær</h1>
      <p>Fraværside for {selectedCompany?.name}</p>
    </div>
  );
} 