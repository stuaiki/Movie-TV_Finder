import React from "react";
import "../css/Home.css";

export const Header: React.FC = () => {
  return (
    <header className="home-header">
      <h1 className="home-title">Movie/TV Show Finder</h1>
      <div className="home-header-right">
        <button>My Favorites</button>
        <button>🔍</button>
      </div>
    </header>
  );
};
