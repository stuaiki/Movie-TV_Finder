import React from "react";
import "../css/LoadingIndicator.css";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};
