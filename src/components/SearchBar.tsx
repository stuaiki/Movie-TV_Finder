import React from "react";
import "../css/Home.css";
import { SearchBarProps } from "../type/movie";

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  mediaType,
  setMediaType,
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

      <select
        className="media-type-dropdown"
        value={mediaType}
        onChange={(e) =>
          setMediaType(e.target.value as "movie" | "tv" | "both")
        }
        style={{ padding: "8px", marginLeft: "10px" }}
      >
        <option value="both">Movie/TV Show</option>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
    </div>
  );
};
