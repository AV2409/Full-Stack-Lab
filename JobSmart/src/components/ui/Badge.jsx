import React from "react";

const Badge = ({ text }) => {
  let className = "badge";
  if (["Full-time", "Selected", "Active"].includes(text)) className += " badge-success";
  if (["Part-time", "Screening"].includes(text)) className += " badge-warning";
  if (["Contract", "Interview", "Applied"].includes(text)) className += " badge-info";
  if (["Rejected", "Closed"].includes(text)) className += " badge-danger";

  return <span className={className}>{text}</span>;
};

export default Badge;
