import React, { useState, useEffect, useCallback } from "react";
import "../css/Home.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

interface MovieCardProps {
  searchQuery: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = useCallback(
    (reset: boolean = false) => {
      const baseUrl = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=6f0ede065b4f9643843249b3d1ad379d&query=${searchQuery}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=6f0ede065b4f9643843249b3d1ad379d&page=${page}`;

      fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          const normalizedQuery = searchQuery.toLowerCase();
          const filteredResults = searchQuery
            ? data.results.filter((movie: Movie) =>
                movie.title.toLowerCase().includes(normalizedQuery)
              )
            : data.results;

          setMovies((prevMovies) =>
            reset || searchQuery
              ? filteredResults
              : [...prevMovies, ...filteredResults]
          );
          setTotalPages(data.total_pages);
        })
        .catch((err) => console.error("Error fetching movies:", err));
    },
    [searchQuery, page]
  );

  useEffect(() => {
    setPage(1);
    fetchMovies(true);
  }, [searchQuery, fetchMovies]);

  useEffect(() => {
    if (!searchQuery && page !== 1) {
      fetchMovies();
    }
  }, [page, searchQuery, fetchMovies]);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  return (
    <div>
      <div className="card-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie Poster"
            />
            <div className="card-title">{movie.title}</div>
            <button
              onClick={() => toggleFavorite(movie.id)}
              className="favorite-btn"
            >
              {favorites[movie.id] ? "♥" : "♡"}
            </button>
          </div>
        ))}
      </div>

      {/* Load more only if not searching */}
      {!searchQuery && page < totalPages && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ display: "block", margin: "20px auto" }}
        >
          Load More
        </button>
      )}
    </div>
  );
};
