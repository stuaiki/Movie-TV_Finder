import React, { useContext } from "react";
import "../css/Home.css";
import FavoritesContext from "../context/FavoritesContext"; // Updated path to use the context-only file
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";

export const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="home">
      <Header />
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        My Favorite Movies
      </h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          You haven't added any favorites yet.
        </p>
      ) : (
        <MovieCard
          searchQuery=""
          mediaType="both"
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          movies={favorites}
          isFavoriteView={true}
        />
      )}
    </div>
  );
};
