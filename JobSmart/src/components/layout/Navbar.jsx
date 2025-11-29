import React from "react";
import Button from "../ui/Button";

const Navbar = ({ activePage, onNavigate, onLogout, userRole, theme, toggleTheme }) => (
  <nav className="navbar">
    <div className="navbar-brand" onClick={() => onNavigate('dashboard')}>
      JobSmart <span className="role-badge">{userRole === 'recruiter' ? 'Recruiter' : 'Candidate'}</span>
    </div>
    <div className="navbar-links">
      <a className={activePage === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')}>Dashboard</a>

      {userRole === 'candidate' ? (
        <>
          <a className={activePage === 'jobs' ? 'active' : ''} onClick={() => onNavigate('jobs')}>Jobs</a>
          <a className={activePage === 'tracking' ? 'active' : ''} onClick={() => onNavigate('tracking')}>Apps</a>
        </>
      ) : (
        <>
           <a className={activePage === 'post-job' ? 'active' : ''} onClick={() => onNavigate('post-job')}>Post Job</a>
           <a className={activePage === 'manage-apps' ? 'active' : ''} onClick={() => onNavigate('manage-apps')}>Applicants</a>
        </>
      )}

      <a className={activePage === 'profile' ? 'active' : ''} onClick={() => onNavigate('profile')}>Profile</a>

      <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <Button variant="secondary" onClick={onLogout}>Logout</Button>
    </div>
  </nav>
);

export default Navbar;
