import React from "react";
import "../css/Home.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="home-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
          className="clear-btn"
          aria-label="Clear search"
          onClick={() => setSearchQuery("")}
        >
          ✖
        </button>
      </div>
      <button className="toggle-button">Movie/TV Show</button>
    </div>
  );
};
