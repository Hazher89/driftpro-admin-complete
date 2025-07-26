'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseService } from '../../lib/firebase-service';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  isActive: boolean;
  createdAt: Date;
  companyId: string;
}

export default function DepartmentsPage() {
  const { selectedCompany } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    manager: ''
  });
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Department | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (selectedCompany) {
      fetchDepartments();
    }
  }, [selectedCompany]);

  async function fetchDepartments() {
    setLoading(true);
    try {
      // Mock data for now - replace with real Firebase call
      const mockDepartments: Department[] = [
        {
          id: '1',
          name: 'IT',
          description: 'Informasjonsteknologi og systemadministrasjon',
          manager: 'Admin DriftPro',
          employeeCount: 8,
          isActive: true,
          createdAt: new Date('2024-01-01T00:00:00Z'),
          companyId: selectedCompany?.id || ''
        },
        {
          id: '2',
          name: 'Vedlikehold',
          description: 'Teknisk vedlikehold og reparasjoner',
          manager: 'Manager DriftPro',
          employeeCount: 12,
          isActive: true,
          createdAt: new Date('2024-01-01T00:00:00Z'),
          companyId: selectedCompany?.id || ''
        },
        {
          id: '3',
          name: 'Produksjon',
          description: 'Produksjon og kvalitetskontroll',
          manager: 'Employee DriftPro',
          employeeCount: 25,
          isActive: true,
          createdAt: new Date('2024-01-01T00:00:00Z'),
          companyId: selectedCompany?.id || ''
        },
        {
          id: '4',
          name: 'Kvalitet',
          description: 'Kvalitetssikring og testing',
          manager: 'Manager DriftPro',
          employeeCount: 6,
          isActive: true,
          createdAt: new Date('2024-01-01T00:00:00Z'),
          companyId: selectedCompany?.id || ''
        },
        {
          id: '5',
          name: 'Logistikk',
          description: 'Lager og transport',
          manager: 'Employee DriftPro',
          employeeCount: 10,
          isActive: false,
          createdAt: new Date('2024-01-01T00:00:00Z'),
          companyId: selectedCompany?.id || ''
        }
      ];
      setDepartments(mockDepartments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
    setLoading(false);
  }

  async function handleCreate() {
    if (!newDepartment.name || !newDepartment.description || !newDepartment.manager) {
      alert('Vennligst fyll ut alle påkrevde felter');
      return;
    }

    try {
      const departmentData: Omit<Department, 'id' | 'createdAt'> = {
        name: newDepartment.name,
        description: newDepartment.description,
        manager: newDepartment.manager,
        employeeCount: 0,
        isActive: true,
        companyId: selectedCompany?.id || ''
      };

      // Mock creation - replace with real Firebase call
      const newDepartmentWithId: Department = {
        ...departmentData,
        id: Date.now().toString(),
        createdAt: new Date()
      };

      setDepartments([...departments, newDepartmentWithId]);
      setShowCreate(false);
      setNewDepartment({
        name: '',
        description: '',
        manager: ''
      });
      alert('Avdeling opprettet');
    } catch (error) {
      alert('Feil ved opprettelse av avdeling');
    }
  }

  async function handleEdit() {
    if (!selected) return;
    
    try {
      // Mock update - replace with real Firebase call
      setDepartments(departments.map(dept => 
        dept.id === selected.id ? selected : dept
      ));
      setEditMode(false);
      alert('Avdeling oppdatert');
    } catch (error) {
      alert('Feil ved oppdatering av avdeling');
    }
  }

  async function handleDelete() {
    if (!selected) return;
    
    setDeleting(true);
    try {
      // Mock deletion - replace with real Firebase call
      setDepartments(departments.filter(dept => dept.id !== selected.id));
      setSelected(null);
      alert('Avdeling slettet');
    } catch (error) {
      alert('Feil ved sletting av avdeling');
    }
    setDeleting(false);
  }

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(search.toLowerCase()) ||
    department.description.toLowerCase().includes(search.toLowerCase()) ||
    department.manager.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3c8dbc' }}>
            <i className="fas fa-building" style={{ marginRight: '10px' }}></i>
            Avdelinger
          </h1>
          <p style={{ color: '#666', marginTop: '5px' }}>Administrer avdelinger og organisasjonsstruktur</p>
        </div>
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
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Ny avdeling
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Søk etter avdeling..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '300px'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {loading ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            Laster avdelinger...
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            Ingen avdelinger funnet
          </div>
        ) : filteredDepartments.map((department) => (
          <div
            key={department.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #ddd',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
            onClick={() => { setSelected(department); setEditMode(false); }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{department.name}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{department.description}</p>
              </div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(department);
                  setEditMode(false);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Manager:</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{department.manager}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Ansatte:</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-users" style={{ fontSize: '12px', color: '#666', marginRight: '5px' }}></i>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{department.employeeCount}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Status:</span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: department.isActive ? '#d4edda' : '#f8d7da',
                  color: department.isActive ? '#155724' : '#721c24'
                }}>
                  {department.isActive ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#3c8dbc',
                    border: '1px solid #3c8dbc',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(department);
                    setEditMode(true);
                  }}
                >
                  Rediger
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#666',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Se ansatte funksjonalitet kommer snart!');
                  }}
                >
                  Se ansatte
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Department Modal */}
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
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Ny avdeling</h2>
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Navn *</label>
              <input
                type="text"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="Avdelingsnavn"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Beskrivelse *</label>
              <textarea
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
                placeholder="Beskrivelse av avdelingen..."
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Manager *</label>
              <input
                type="text"
                value={newDepartment.manager}
                onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="Navn på manager"
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

      {/* Edit Department Modal */}
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
                {editMode ? 'Rediger avdeling' : 'Avdelingsdetaljer'}
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Navn</label>
              <input
                type="text"
                value={selected.name}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Beskrivelse</label>
              <textarea
                value={selected.description}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '80px',
                  resize: 'vertical',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Manager</label>
              <input
                type="text"
                value={selected.manager}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, manager: e.target.value })}
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
              <select
                value={selected.isActive ? 'active' : 'inactive'}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, isActive: e.target.value === 'active' })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: editMode ? 'white' : '#f8f9fa'
                }}
              >
                <option value="active">Aktiv</option>
                <option value="inactive">Inaktiv</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Antall ansatte</label>
              <input
                type="number"
                value={selected.employeeCount}
                disabled={!editMode}
                onChange={(e) => setSelected({ ...selected, employeeCount: parseInt(e.target.value) || 0 })}
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