import React from "react";
import Badge from "../../components/ui/Badge";

const ManageApplications = ({ applications, onUpdateStatus }) => {
  const hasApps = applications && applications.length > 0;

  return (
    <div className="page-container">
      <h2>Manage Applications</h2>
      <div className="card tracking-table-card">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied For</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hasApps ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.candidateName}</strong>
                    <br />
                    <span className="text-small text-muted">
                      Applied {app.date}
                    </span>
                  </td>
                  <td>{app.jobTitle}</td>
                  <td>
                    <Badge text={app.status} />
                  </td>
                  <td>
                    <div className="action-buttons">
                      {app.status !== "Rejected" &&
                      app.status !== "Selected" ? (
                        <>
                          <button
                            className="icon-btn check"
                            title="Advance"
                            onClick={() => onUpdateStatus(app.id, "advance")}
                          >
                            ✓
                          </button>
                          <button
                            className="icon-btn cross"
                            title="Reject"
                            onClick={() => onUpdateStatus(app.id, "reject")}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
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

export default ManageApplications;
