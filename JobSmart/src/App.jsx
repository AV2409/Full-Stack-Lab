import React, { useState } from "react";
import { MOCK_CANDIDATE, MOCK_RECRUITER, INITIAL_JOBS, INITIAL_APPLICATIONS } from "./data/mockData";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import Badge from "./components/ui/Badge";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./pages/auth/LoginPage";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import ApplicationTracking from "./pages/candidate/ApplicationTracking";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJobPage from "./pages/recruiter/PostJobPage";
import ManageApplications from "./pages/recruiter/ManageApplications";
import JobCard from "./components/jobs/JobCard";

export default function App() {
  const [userRole, setUserRole] = useState(null); 
  const [view, setView] = useState('login');
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for "Apply" modal (simple React state)
  const [applicantName, setApplicantName] = useState(MOCK_CANDIDATE.name);
  const [applicantEmail, setApplicantEmail] = useState(MOCK_CANDIDATE.email);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  // Theme State
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Derived list: applications only for this recruiter (by company)
  const recruiterApplications = applications.filter(
    app => app.company === MOCK_RECRUITER.company
  );

  // -- Handlers --

  const handleLogin = (role) => {
    setUserRole(role);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setView('login');
  };

  // Candidate Actions
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setView('details');
  };

  const handleApply = () => {
    // reset form every time user opens the apply modal
    setApplicantName(MOCK_CANDIDATE.name);
    setApplicantEmail(MOCK_CANDIDATE.email);
    setCoverLetter("");
    setResumeLink("");
    setIsModalOpen(true);
  };

  const submitApplication = () => {
    if (!selectedJob) return;

    if (!applicantName.trim() || !applicantEmail.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    const newApp = {
      id: Date.now(),
      jobId: selectedJob.id,
      candidateName: applicantName,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      status: "Applied",
      date: new Date().toLocaleDateString()
      // coverLetter and resumeLink can also be stored if needed
    };

    // Add application to global list
    setApplications(prev => [...prev, newApp]);

    // NEW: bump applicant count on the corresponding job (for recruiter cards)
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === selectedJob.id
          ? { ...job, applicants: (job.applicants || 0) + 1 }
          : job
      )
    );

    setIsModalOpen(false);
    setCoverLetter("");
    setResumeLink("");
    alert("Application Submitted!");
    setView('tracking');
  };

  // Recruiter Actions
  const handlePostJob = (jobData) => {
    const newJob = { ...jobData, id: Date.now() };
    setJobs(prev => [newJob, ...prev]);
    setView('dashboard');
    alert("Job Posted Successfully!");
  };

  const handleUpdateStatus = (appId, action) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;

      let newStatus = app.status;
      if (action === 'reject') newStatus = 'Rejected';
      else if (action === 'advance') {
        if (app.status === 'Applied') newStatus = 'Screening';
        else if (app.status === 'Screening') newStatus = 'Interview';
        else if (app.status === 'Interview') newStatus = 'Selected';
      }
      return { ...app, status: newStatus };
    }));
  };

  // -- Render Logic --

  const renderContent = () => {
    if (!userRole) {
       return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
    }

    // Recruiter Routes
    if (userRole === 'recruiter') {
      switch (view) {
        case 'dashboard': 
          return (
            <RecruiterDashboard
              jobs={jobs}
              applications={recruiterApplications}
              onNavigate={setView}
            />
          );
        case 'post-job': 
          return (
            <PostJobPage
              onPostJob={handlePostJob}
              onCancel={() => setView('dashboard')}
            />
          );
        case 'manage-apps': 
          return (
            <ManageApplications
              applications={recruiterApplications}
              onUpdateStatus={handleUpdateStatus}
            />
          );
        case 'profile': 
          return (
            <div className="page-container">
                <h2>Recruiter Profile</h2>
                <div className="card">
                    <h3>{MOCK_RECRUITER.company}</h3>
                    <p>Recruiter: {MOCK_RECRUITER.name}</p>
                    <p>Email: {MOCK_RECRUITER.email}</p>
                </div>
            </div>
          );
        default: 
          return (
            <RecruiterDashboard
              jobs={jobs}
              applications={recruiterApplications}
              onNavigate={setView}
            />
          );
      }
    }

    // Candidate Routes
    switch (view) {
      case 'dashboard': 
        return (
          <CandidateDashboard
            jobs={jobs}
            onNavigate={setView}
            onViewJob={handleViewJob}
          />
        );
      case 'jobs': 
        return (
          <div className="page-container">
              <h2>All Job Openings</h2>
              <div className="job-grid">
                  {jobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={handleViewJob}
                    />
                  ))}
              </div>
          </div>
        );
      case 'details': 
        return selectedJob ? (
          <div className="page-container">
            <Button variant="text" onClick={() => setView('jobs')}>&larr; Back to Jobs</Button>
            <div className="card job-details-card">
              <div className="details-header">
                <div>
                  <h1>{selectedJob.title}</h1>
                  <h3>{selectedJob.company}</h3>
                </div>
                <Button onClick={handleApply}>Apply Now</Button>
              </div>
              <div className="details-meta">
                  <Badge text={selectedJob.type} />
                  <span>📍 {selectedJob.location}</span>
                  <span>💰 {selectedJob.salary}</span>
              </div>
              <div className="details-section">
                <h3>Description</h3>
                <p>{selectedJob.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-container">
            <p>No job selected.</p>
          </div>
        );
      case 'tracking': 
        return (
          <ApplicationTracking
            applications={applications}
          />
        );
      case 'profile': 
        return (
          <div className="page-container">
              <h2>My Profile</h2>
              <div className="card">
                  <h3>{MOCK_CANDIDATE.name}</h3>
                  <p>{MOCK_CANDIDATE.title}</p>
                  <div className="job-tags" style={{marginTop:'1rem'}}>
                      {MOCK_CANDIDATE.skills.map(s => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                  </div>
              </div>
          </div>
        );
      default: 
        return (
          <CandidateDashboard
            jobs={jobs}
            onNavigate={setView}
            onViewJob={handleViewJob}
          />
        );
    }
  };

  return (
    <div className="app-root" data-theme={theme}>
      {userRole && (
        <Navbar 
          activePage={view} 
          onNavigate={setView} 
          onLogout={handleLogout} 
          userRole={userRole}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      <main>
        {renderContent()}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedJob ? `Apply to ${selectedJob.company}` : "Apply"}
      >
        <form onSubmit={(e) => { e.preventDefault(); submitApplication(); }}>
          <Input
            label="Full Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
          <div className="input-group">
            <label className="input-label">Cover Letter</label>
            <textarea
              className="input-field"
              placeholder="Why are you a good fit for this role?"
              rows="4"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>
          <div className="input-group">
             <label className="input-label">Resume / Portfolio Link</label>
             <input
               className="input-field"
               type="text"
               placeholder="https://..."
               value={resumeLink}
               onChange={(e) => setResumeLink(e.target.value)}
             />
          </div>
          <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem'}}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              style={{flex: 1}}
            >
              Cancel
            </Button>
            <Button type="submit" style={{flex: 1}}>
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
