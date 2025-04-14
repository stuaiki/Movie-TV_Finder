import React from "react";
import "../css/Home.css";

interface HeaderProps {
  isFavoriteView: boolean;
  onToggleFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isFavoriteView,
  onToggleFavorites,
}) => {
  return (
    <header className="home-header">
      <h1 className="home-title">Movie/TV Show Finder</h1>
      <div className="home-header-right">
        {!isFavoriteView ? (
          <button onClick={onToggleFavorites}>My Favorites</button>
        ) : (
          <button onClick={onToggleFavorites}>Back to Finder</button>
        )}
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
