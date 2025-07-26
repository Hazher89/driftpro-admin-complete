'use client';

import { useAuth } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const { selectedCompany } = useAuth();

  // Mock data for demonstration
  const stats = [
    {
      title: 'CPU TRAFFIC',
      value: '90%',
      icon: 'fas fa-cogs',
      color: 'info',
      change: '+17%',
      changeType: 'success'
    },
    {
      title: 'LIKES',
      value: '41,410',
      icon: 'fab fa-google-plus',
      color: 'danger',
      change: '+17%',
      changeType: 'success'
    },
    {
      title: 'SALES',
      value: '760',
      icon: 'fas fa-shopping-cart',
      color: 'success',
      change: '+17%',
      changeType: 'success'
    },
    {
      title: 'NEW MEMBERS',
      value: '2,000',
      icon: 'fas fa-users',
      color: 'warning',
      change: '+17%',
      changeType: 'success'
    }
  ];

  const progressData = [
    { label: 'Add Products to Cart', value: 160, max: 200, color: 'info' },
    { label: 'Complete Purchase', value: 310, max: 400, color: 'danger' },
    { label: 'Visit Premium Page', value: 480, max: 800, color: 'success' },
    { label: 'Send Inquiries', value: 250, max: 500, color: 'warning' }
  ];

  const recentActivity = [
    {
      user: 'Alexander Pierce',
      action: 'Is this template really for free? That\'s unbelievable!',
      time: '23 Jan 2:00 pm',
      avatar: 'AP'
    },
    {
      user: 'Sarah Bullock',
      action: 'You better believe it!',
      time: '23 Jan 2:05 pm',
      avatar: 'SB'
    }
  ];

  const newMembers = [
    { name: 'John Doe', avatar: 'JD' },
    { name: 'Jane Smith', avatar: 'JS' },
    { name: 'Bob Johnson', avatar: 'BJ' },
    { name: 'Alice Brown', avatar: 'AB' }
  ];

  return (
    <div>
      {/* Content Header */}
      <div className="content-header">
        <h1 className="content-title">Dashboard</h1>
        <p className="content-subtitle">Versjon 2.0</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
            <h3 className="stat-number">{stat.value}</h3>
            <p className="stat-label">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Monthly Recap Report */}
        <div className="chart-container">
          <h3 className="chart-title">Monthly Recap Report</h3>
          <p className="chart-subtitle">Sales: 1 Jan, 2024 - 30 Jul, 2024</p>
          
          {/* Mock Chart Area */}
          <div style={{ 
            height: '300px', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <i className="fas fa-chart-area" style={{ fontSize: '48px', marginBottom: '10px' }}></i>
              <p>Chart Area - Monthly Sales Data</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--success-color)', margin: '0', fontSize: '18px' }}>$35,210.43</h4>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>TOTAL REVENUE</p>
              <span style={{ color: 'var(--success-color)', fontSize: '12px' }}>+17%</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--warning-color)', margin: '0', fontSize: '18px' }}>$10,390.90</h4>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>TOTAL COST</p>
              <span style={{ color: 'var(--warning-color)', fontSize: '12px' }}>+0%</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--danger-color)', margin: '0', fontSize: '18px' }}>$24,813.53</h4>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>TOTAL PROFIT</p>
              <span style={{ color: 'var(--danger-color)', fontSize: '12px' }}>-20%</span>
            </div>
          </div>
        </div>

        {/* Goal Completion */}
        <div className="chart-container">
          <h3 className="chart-title">Goal Completion</h3>
          
          <div className="progress-item">
            {progressData.map((item, index) => (
              <div key={index} className="progress-item">
                <div className="progress-label">
                  <span>{item.label}</span>
                  <span>{item.value}/{item.max}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${item.color}`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4 style={{ color: 'var(--danger-color)', margin: '0', fontSize: '18px' }}>1200</h4>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>GOAL COMPLETIONS</p>
            <span style={{ color: 'var(--danger-color)', fontSize: '12px' }}>-18%</span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* Direct Chat */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Direct Chat</h3>
          </div>
          <div className="card-body">
            {recentActivity.map((activity, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div className="user-avatar" style={{ width: '40px', height: '40px' }}>
                  {activity.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{activity.user}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{activity.action}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Members */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Latest Members</h3>
            <span className="menu-badge success">8 New Members</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {newMembers.map((member, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div className="user-avatar" style={{ width: '50px', height: '50px', margin: '0 auto 5px' }}>
                    {member.avatar}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '600' }}>{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Browser Usage */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Browser Usage</h3>
          </div>
          <div className="card-body">
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              background: 'conic-gradient(#dc3545 0deg 120deg, #17a2b8 120deg 240deg, #28a745 240deg 360deg)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Browser
              </div>
            </div>
            
            <div style={{ fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Chrome</span>
                <span style={{ color: 'var(--danger-color)' }}>33%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>IE</span>
                <span style={{ color: 'var(--info-color)' }}>33%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Firefox</span>
                <span style={{ color: 'var(--success-color)' }}>34%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div className="stat-card warning">
          <div className="stat-icon">
            <i className="fas fa-tags"></i>
          </div>
          <h3 className="stat-number">5,200</h3>
          <p className="stat-label">INVENTORY</p>
          <small style={{ color: 'var(--warning-color)' }}>50% Increase in 30 Days</small>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <i className="fas fa-heart"></i>
          </div>
          <h3 className="stat-number">92,050</h3>
          <p className="stat-label">MENTIONS</p>
          <small style={{ color: 'var(--success-color)' }}>20% Increase in 30 Days</small>
        </div>
        
        <div className="stat-card danger">
          <div className="stat-icon">
            <i className="fas fa-cloud-download-alt"></i>
          </div>
          <h3 className="stat-number">114,381</h3>
          <p className="stat-label">DOWNLOADS</p>
          <small style={{ color: 'var(--danger-color)' }}>70% Increase in 30 Days</small>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">
            <i className="fas fa-comments"></i>
          </div>
          <h3 className="stat-number">163,921</h3>
          <p className="stat-label">DIRECT MESSAGES</p>
          <small style={{ color: 'var(--info-color)' }}>40% Increase in 30 Days</small>
        </div>
      </div>
    </div>
  );
} 