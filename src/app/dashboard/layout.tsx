'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, adminUser, selectedCompany, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!currentUser || !adminUser || !selectedCompany) {
    return (
      <div className="d-flex align-center justify-center h-full">
        <div className="text-center">
          <h2>Laster...</h2>
          <p>Henter brukerdata...</p>
        </div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={sidebarCollapsed ? 'sidebar-collapsed' : ''}>
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <button className="hamburger-menu" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo">DriftPro Admin</div>
        </div>
        
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-button">
              <i className="fas fa-envelope"></i>
              <span className="badge">4</span>
            </button>
            <button className="icon-button">
              <i className="fas fa-bell"></i>
              <span className="badge badge-warning">15</span>
            </button>
            <button className="icon-button">
              <i className="fas fa-flag"></i>
              <span className="badge badge-info">9</span>
            </button>
          </div>
          
          <div className="user-profile">
            <div className="user-avatar">
              {adminUser.firstName?.charAt(0) || 'A'}
            </div>
            <div className="user-info">
              <div className="user-name">{adminUser.firstName} {adminUser.lastName}</div>
              <div className="user-status">Online</div>
            </div>
          </div>
          
          <div className="breadcrumb">
            <span>Hjem</span>
            <span className="breadcrumb-separator">/</span>
            <span>Dashboard</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {adminUser.firstName?.charAt(0) || 'A'}
            </div>
            <div className="sidebar-user-info">
              <h4>{adminUser.firstName} {adminUser.lastName}</h4>
              <p>Online</p>
            </div>
          </div>
          <div className="sidebar-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Søk..." />
          </div>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-section">
            <div className="menu-section-title">Hovedmeny</div>
            <a href="/dashboard" className="menu-item active">
              <i className="fas fa-tachometer-alt"></i>
              <span className="menu-item-text">Dashboard</span>
            </a>
            <a href="/users" className="menu-item">
              <i className="fas fa-users"></i>
              <span className="menu-item-text">Brukere</span>
              <span className="menu-badge">4</span>
            </a>
            <a href="/departments" className="menu-item">
              <i className="fas fa-building"></i>
              <span className="menu-item-text">Avdelinger</span>
              <span className="menu-badge success">NEW</span>
            </a>
            <a href="/chat" className="menu-item">
              <i className="fas fa-comments"></i>
              <span className="menu-item-text">Chat</span>
            </a>
            <a href="/deviations" className="menu-item">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="menu-item-text">Avvik</span>
            </a>
            <a href="/documents" className="menu-item">
              <i className="fas fa-file-alt"></i>
              <span className="menu-item-text">Dokumenter</span>
            </a>
            <a href="/shifts" className="menu-item">
              <i className="fas fa-calendar-alt"></i>
              <span className="menu-item-text">Skiftplan</span>
              <span className="menu-badge warning">17</span>
            </a>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Administrasjon</div>
            <a href="/reports" className="menu-item">
              <i className="fas fa-chart-bar"></i>
              <span className="menu-item-text">Rapporter</span>
            </a>
            <a href="/settings" className="menu-item">
              <i className="fas fa-cog"></i>
              <span className="menu-item-text">Innstillinger</span>
            </a>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Labels</div>
            <div className="menu-item">
              <i className="fas fa-circle" style={{color: '#dc3545'}}></i>
              <span className="menu-item-text">Viktig</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-circle" style={{color: '#ffc107'}}></i>
              <span className="menu-item-text">Advarsel</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-circle" style={{color: '#17a2b8'}}></i>
              <span className="menu-item-text">Informasjon</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
} 