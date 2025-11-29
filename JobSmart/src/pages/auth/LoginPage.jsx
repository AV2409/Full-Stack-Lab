import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const LoginPage = ({ onLogin, theme, toggleTheme }) => {
  const [role, setRole] = useState('candidate');

  return (
    <div className="auth-container">
      <div className="theme-corner-btn">
          <button className="theme-toggle-btn" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
      </div>
      <div className="card auth-card">
        <h2>Welcome Back</h2>
        <p className="text-muted">Login to {role === 'candidate' ? 'find your dream job' : 'hire top talent'}</p>

        <div className="role-toggle">
          <button 
            className={`toggle-btn ${role === 'candidate' ? 'active' : ''}`}
            onClick={() => setRole('candidate')}
          >
            Candidate
          </button>
          <button 
            className={`toggle-btn ${role === 'recruiter' ? 'active' : ''}`}
            onClick={() => setRole('recruiter')}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
          <Input label="Email" placeholder={role === 'candidate' ? "alex@example.com" : "sarah@technova.com"} />
          <Input label="Password" type="password" placeholder="••••••" />
          <Button type="submit" style={{width: '100%', marginTop: '1rem'}}>
            Login as {role === 'candidate' ? 'Candidate' : 'Recruiter'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
