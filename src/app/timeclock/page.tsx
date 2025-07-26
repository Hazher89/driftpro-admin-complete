'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'clock-in' | 'clock-out';
  timestamp: Date;
  location?: string;
  notes?: string;
}

interface Employee {
  id: string;
  name: string;
  isClockedIn: boolean;
  lastClockIn?: Date;
  lastClockOut?: Date;
}

export default function TimeClockPage() {
  const { selectedCompany } = useAuth();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    if (selectedCompany) {
      fetchData();
    }
  }, [selectedCompany]);

  async function fetchData() {
    setLoading(true);
    try {
      // Mock data for now - replace with real Firebase call
      const mockEmployees: Employee[] = [
        {
          id: 'EMP001',
          name: 'Admin DriftPro',
          isClockedIn: true,
          lastClockIn: new Date('2024-07-26T08:00:00'),
          lastClockOut: new Date('2024-07-25T17:00:00')
        },
        {
          id: 'EMP002',
          name: 'Manager DriftPro',
          isClockedIn: false,
          lastClockIn: new Date('2024-07-25T08:30:00'),
          lastClockOut: new Date('2024-07-25T16:30:00')
        }
      ];

      const mockTimeEntries: TimeEntry[] = [
        {
          id: '1',
          employeeId: 'EMP001',
          employeeName: 'Admin DriftPro',
          type: 'clock-in',
          timestamp: new Date('2024-07-26T08:00:00'),
          location: 'Hovedkontor',
          notes: 'På jobb'
        },
        {
          id: '2',
          employeeId: 'EMP001',
          employeeName: 'Admin DriftPro',
          type: 'clock-out',
          timestamp: new Date('2024-07-25T17:00:00'),
          location: 'Hovedkontor',
          notes: 'Ferdig for dagen'
        }
      ];

      setEmployees(mockEmployees);
      setTimeEntries(mockTimeEntries);
    } catch (error: unknown) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stempling</h1>
      <p>Stemplingsside for {selectedCompany?.name}</p>
    </div>
  );
} 