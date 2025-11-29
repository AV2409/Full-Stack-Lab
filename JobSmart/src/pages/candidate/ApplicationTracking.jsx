import React from "react";
import Badge from "../../components/ui/Badge";

const ApplicationTracking = ({ applications }) => {
  const myApplications = applications; // show all in this prototype

  return (
    <div className="page-container">
      <h2>My Applications</h2>
      <div className="card tracking-table-card">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myApplications.map((app) => (
              <tr key={app.id}>
                <td>
                  <strong>{app.jobTitle}</strong>
                </td>
                <td>{app.company}</td>
                <td>{app.date}</td>
                <td>
                  <Badge text={app.status} />
                </td>
              </tr>
            ))}
            {myApplications.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", color: "#64748b" }}
                >
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTracking;
