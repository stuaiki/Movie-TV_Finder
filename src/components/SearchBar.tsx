import React from "react";
import "../css/Home.css";

export const SearchBar: React.FC = () => {
  return (
    <div className="home-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search title..."
          className="search-input"
        />
        <button className="clear-btn" aria-label="Clear search">
          ✖
        </button>
      </div>
      <button className="toggle-button">Movie/TV Show</button>
    </div>
  );
};
