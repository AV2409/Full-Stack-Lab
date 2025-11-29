import React from "react";
import Button from "../../components/ui/Button";
import JobCard from "../../components/jobs/JobCard";

const CandidateDashboard = ({ jobs, onNavigate, onViewJob }) => (
  <div className="page-container">
    <div className="hero-section">
      <h1>Find your next <span className="highlight">career move</span></h1>
      <p>Browse thousands of jobs from top companies.</p>
      <div className="hero-buttons">
        <Button onClick={() => onNavigate('jobs')}>Browse All Jobs</Button>
      </div>
    </div>

    <h2 className="section-title">Recommended for You</h2>
    <div className="job-grid">
      {jobs.slice(0, 3).map(job => (
        <JobCard key={job.id} job={job} onClick={onViewJob} />
      ))}
    </div>
  </div>
);

export default CandidateDashboard;
