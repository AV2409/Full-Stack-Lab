import React from "react";
import Button from "../../components/ui/Button";
import JobCard from "../../components/jobs/JobCard";

const RecruiterDashboard = ({ jobs, applications, onNavigate }) => {
  const totalApplicants = applications ? applications.length : 0;

  const actionRequired = applications
    ? applications.filter(
        (app) => app.status === "Applied" || app.status === "Screening"
      ).length
    : 0;

  return (
    <div className="page-container">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Jobs</h3>
          <div className="stat-value">{jobs.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Applicants</h3>
          <div className="stat-value">{totalApplicants}</div>
        </div>
        <div className="stat-card highlight-card">
          <h3>Action Required</h3>
          <div className="stat-value">{actionRequired}</div>
          <p>Applications pending review</p>
        </div>
      </div>

      <div className="section-header">
        <h2>Your Job Postings</h2>
        <Button onClick={() => onNavigate("post-job")}>+ Post New Job</Button>
      </div>

      <div className="job-grid">
        {jobs.map((job) => {
          const jobApplicants = applications
            ? applications.filter((app) => app.jobId === job.id).length
            : 0;

          return (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onNavigate("manage-apps")}
              isRecruiter={true}
              applicantCount={jobApplicants}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
