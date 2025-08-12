import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login, loading, error: authError, user } = useAuth();

  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const validateEmail = (email) => {
    // Simple regex check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const { email, password } = formData;

    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      await login(email, password);
      // Navigate handled by useEffect
    } catch (error) {
      setFormError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your account and continue shopping</p>
        </div>

        <div className="auth-form-container">
          <div className="auth-social">
            <button type="button" className="social-button google">
              <span className="social-icon">G</span>
              Continue with Google
            </button>
            <button type="button" className="social-button facebook">
              <span className="social-icon">f</span>
              Continue with Facebook
            </button>
            <div className="divider"><span>or</span></div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {formError && <div className="form-error">{formError}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
              </div>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-background">
        <div className="auth-decoration"></div>
      </div>
    </div>
  );
}

export default Login;
