import React from "react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const JobCard = ({ job, onClick, isRecruiter, applicantCount }) => {
  // For recruiter, prefer the explicit applicantCount prop.
  // Fallback to job.applicants if applicantCount isn't provided (just in case).
  const displayCount =
    isRecruiter && typeof applicantCount === "number"
      ? applicantCount
      : job.applicants || 0;

  return (
    <div className="card job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <Badge text={job.type} />
      </div>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
        {isRecruiter && (
          <span>👥 {displayCount} Applicants</span>
        )}
      </div>

      <div className="job-tags">
        {job.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <Button
        variant="outline"
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={() => onClick(job)}
      >
        {isRecruiter ? "Manage Job" : "View Details"}
      </Button>
    </div>
  );
};

export default JobCard;
