import React from "react";

const DashboardHeading = ({ title = "", desc = "", className = "mb-0" }) => {
  return (
    <>
      <h1 className={`dashboard-heading ${className} text-primary`}>{title}</h1>
    </>
  );
};

export default DashboardHeading;
