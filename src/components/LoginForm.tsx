'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login - replace with real Firebase auth
      if (email === 'admin@driftpro.no' && password === 'admin123') {
        await login(email, password);
        router.push('/dashboard');
      } else {
        setError('Ugyldig e-post eller passord');
      }
    } catch (err) {
      setError('Innlogging feilet. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb',
          fontSize: '14px'
        }}>
          <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#333'
        }}>
          E-post
        </label>
        <div style={{ position: 'relative' }}>
          <i className="fas fa-envelope" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            fontSize: '14px'
          }}></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@driftpro.no"
            required
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

      <div style={{ marginBottom: '25px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#333'
        }}>
          Passord
        </label>
        <div style={{ position: 'relative' }}>
          <i className="fas fa-lock" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            fontSize: '14px'
          }}></i>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#6c757d',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          background: loading ? '#6c757d' : '#3c8dbc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.background = '#367fa9';
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.background = '#3c8dbc';
        }}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Logger inn...
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt"></i>
            Logg inn
          </>
        )}
      </button>

      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        fontSize: '12px',
        color: '#6c757d'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          <strong>Demo-konto:</strong>
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          E-post: <code>admin@driftpro.no</code>
        </p>
        <p style={{ margin: '0' }}>
          Passord: <code>admin123</code>
        </p>
      </div>
    </form>
  );
} 