import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="home-header">
      <h1 className="home-title">Movie/TV Show Finder</h1>
      <div className="home-header-right">
        <Link to="/" className="home-link">
          Home
        </Link>
        <Link to="/favorites" className="home-link">
          Favorites
        </Link>
        <button aria-label="Profile" className="icon-button">
          <img
            src="https://cdn1.iconfinder.com/data/icons/ui-next-2020-shopping-and-e-commerce-1/12/75_user-circle-512.png"
            alt="Profile"
          />
        </button>
      </div>
    </header>
  );
};
