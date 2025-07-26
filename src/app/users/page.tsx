'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseService } from '../../lib/firebase-service';

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

export default function UsersPage() {
  const { selectedCompany } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'employee' as 'admin' | 'manager' | 'employee',
    department: '',
    phoneNumber: '',
    employeeId: ''
  });
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selected, setSelected] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (selectedCompany) {
      fetchUsers();
    }
  }, [selectedCompany]);

  async function fetchUsers() {
    setLoading(true);
    try {
      if (selectedCompany) {
        const users = await FirebaseService.getUsersByCompany(selectedCompany.id);
        setUsers(users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  }

  async function handleCreate() {
    if (!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.role) {
      alert('Vennligst fyll ut alle påkrevde felter');
      return;
    }

    try {
      const userData: Partial<User> = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        companyId: selectedCompany?.id || '',
        department: newUser.department || undefined,
        phoneNumber: newUser.phoneNumber || undefined,
        employeeId: newUser.employeeId || undefined,
        isActive: true
      };

      // Mock creation - replace with real Firebase call
      const newUserWithId: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date()
      } as User;

      setUsers([...users, newUserWithId]);
      setShowCreate(false);
      setNewUser({
        email: '',
        firstName: '',
        lastName: '',
        role: 'employee',
        department: '',
        phoneNumber: '',
        employeeId: ''
      });
      alert('Bruker opprettet');
    } catch (error) {
      alert('Feil ved opprettelse av bruker');
    }
  }

  async function handleEdit() {
    if (!selected) return;
    
    try {
      // Mock update - replace with real Firebase call
      setUsers(users.map(user => 
        user.id === selected.id ? selected : user
      ));
      setEditMode(false);
      alert('Bruker oppdatert');
    } catch (error) {
      alert('Feil ved oppdatering av bruker');
    }
  }

  async function handleDelete() {
    if (!selected) return;
    
    setDeleting(true);
    try {
      // Mock deletion - replace with real Firebase call
      setUsers(users.filter(user => user.id !== selected.id));
      setSelected(null);
      alert('Bruker slettet');
    } catch (error) {
      alert('Feil ved sletting av bruker');
    }
    setDeleting(false);
  }

  function exportToCSV() {
    const rows = filtered.map((u) => [u.firstName + ' ' + u.lastName, u.email, u.role, u.department || '']);
    const csv = ["Navn,E-post,Rolle,Avdeling", ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brukere.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = users.filter(
    (u) =>
      (!search || 
        u.firstName.toLowerCase().includes(search.toLowerCase()) || 
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (!roleFilter || u.role === roleFilter)
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3c8dbc' }}>
          <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
          Brukere
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportToCSV}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Eksporter filtrerte brukere til CSV"
          >
            <i className="fas fa-download" style={{ marginRight: '8px' }}></i>
            Eksporter CSV
          </button>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              backgroundColor: '#3c8dbc',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Opprett ny bruker"
          >
            <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
            Ny bruker
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Søk navn eller e-post..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '250px'
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="">Alle roller</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Ansatt</option>
        </select>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f6f9' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Navn</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>E-post</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Rolle</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Avdeling</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Laster brukere...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Ingen brukere funnet
                </td>
              </tr>
            ) : filtered.map((user) => (
              <tr 
                key={user.id} 
                style={{ 
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => { setSelected(user); setEditMode(false); }}
              >
                <td style={{ padding: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{user.firstName} {user.lastName}</div>
                    {user.employeeId && (
                      <div style={{ fontSize: '12px', color: '#666' }}>ID: {user.employeeId}</div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: 
                      user.role === 'admin' ? '#dc3545' :
                      user.role === 'manager' ? '#ffc107' : '#28a745',
                    color: 
                      user.role === 'admin' ? 'white' :
                      user.role === 'manager' ? '#212529' : 'white'
                  }}>
                    {user.role === 'admin' ? 'Admin' :
                     user.role === 'manager' ? 'Manager' : 'Ansatt'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{user.department || '-'}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: user.isActive ? '#d4edda' : '#f8d7da',
                    color: user.isActive ? '#155724' : '#721c24'
                  }}>
                    {user.isActive ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showCreate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Ny bruker</h2>
              <button
                onClick={() => setShowCreate(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fornavn *</label>
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="Fornavn"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Etternavn *</label>
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="Etternavn"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-post *</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="e-post@eksempel.no"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rolle *</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'manager' | 'employee' })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="employee">Ansatt</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Avdeling</label>
              <input
                type="text"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="Avdeling"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Telefon</label>
              <input
                type="tel"
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="+47 123 45 678"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ansatt ID</label>
              <input
                type="text"
                value={newUser.employeeId}
                onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="EMP001"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreate(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Avbryt
              </button>
              <button
                onClick={handleCreate}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3c8dbc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Opprett
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selected && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {editMode ? 'Rediger bruker' : 'Brukerdetaljer'}
              </h2>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fornavn</label>
              <input
                type="text"
                value={selected.firstName}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, firstName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Etternavn</label>
              <input
                type="text"
                value={selected.lastName}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, lastName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-post</label>
              <input
                type="email"
                value={selected.email}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rolle</label>
              <select
                value={selected.role}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, role: e.target.value as 'admin' | 'manager' | 'employee' })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              >
                <option value="employee">Ansatt</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Avdeling</label>
              <input
                type="text"
                value={selected.department || ''}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, department: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Telefon</label>
              <input
                type="tel"
                value={selected.phoneNumber || ''}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, phoneNumber: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ansatt ID</label>
              <input
                type="text"
                value={selected.employeeId || ''}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, employeeId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{
                      padding: '10px 20px',
                      border: '1px solid #ddd',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={handleEdit}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3c8dbc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Lagre
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3c8dbc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Rediger
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  opacity: deleting ? 0.6 : 1
                }}
              >
                {deleting ? 'Sletter...' : 'Slett'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 