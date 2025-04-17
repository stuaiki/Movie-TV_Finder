// MovieCard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Movie, MovieCardProps } from "../type/movie"; // Ensure this path is correct
import useFetchMovies from "../hooks/useFetchMovies";
import "../css/Home.css";
import ErrorBoundary from "./ErrorBoundary";

export const MovieCard: React.FC<MovieCardProps> = ({
  searchQuery,
  mediaType,
  favorites,
  toggleFavorite,
  movies: customMovies,
  isFavoriteView = false,
}) => {
  const navigate = useNavigate();

  // Track the current page for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset pagination when the filter (searchQuery or mediaType) changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, mediaType]);

  // Use the custom hook with the current page value
  const { movies, totalPages, isLoading, error } = useFetchMovies({
    searchQuery,
    mediaType,
    page: currentPage,
  });

  // Decide which movies to display:
  // - If in favorites view, use customMovies passed via props.
  // - Otherwise, use movies fetched by the hook.
  const displayedMovies: Movie[] = isFavoriteView ? customMovies || [] : movies;

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {isLoading && currentPage === 1 ? (
        <div>Loading...</div>
      ) : (
        <ErrorBoundary>
          <div className="card-grid">
            {displayedMovies.map((movie) => (
              <div
                key={movie.id}
                className="card"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="card-title">{movie.title || movie.name}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when toggling favorite
                    toggleFavorite(movie);
                  }}
                  className="favorite-btn"
                >
                  {favorites.some((fav) => fav.id === movie.id) ? "❤" : "♡"}
                </button>
              </div>
            ))}
          </div>
        </ErrorBoundary>
      )}

      {/* Only show Load More button if not in favorites view, not loading, and there's another page */}
      {!isFavoriteView && !isLoading && currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{ display: "block", margin: "20px auto" }}
        >
          Load More
        </button>
      )}
    </div>
  );
};
