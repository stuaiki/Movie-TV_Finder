import React, { useState, useEffect, useCallback } from "react";
import "../css/Home.css";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type?: string;
  popularity?: number;
};

interface MovieCardProps {
  searchQuery: string;
  mediaType: "movie" | "tv" | "both";
}

export const MovieCard: React.FC<MovieCardProps> = ({
  searchQuery,
  mediaType,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 🔁 Refetch when page changes
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // 🔄 Reset when search or type changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1); // 👈 manually fetch first page after reset
  }, [searchQuery, mediaType]);

  const fetchMovies = useCallback(
    (pageNumber: number) => {
      const apiKey = "6f0ede065b4f9643843249b3d1ad379d";
      const queryParam = searchQuery
        ? `&query=${encodeURIComponent(searchQuery)}`
        : "";

      if (searchQuery) {
        const endpoint = `https://api.themoviedb.org/3/search/${
          mediaType === "both" ? "multi" : mediaType
        }?api_key=${apiKey}&page=${pageNumber}${queryParam}&language=en-US&include_adult=false`;

        fetch(endpoint)
          .then((res) => res.json())
          .then((data) => {
            let results = data.results || [];
            const normalizedQuery = searchQuery.toLowerCase();

            if (mediaType === "both") {
              results = results.filter(
                (item: Movie) =>
                  (item.media_type === "movie" || item.media_type === "tv") &&
                  (item.title?.toLowerCase().includes(normalizedQuery) ||
                    item.name?.toLowerCase().includes(normalizedQuery))
              );
            } else {
              results = results.filter(
                (item: Movie) =>
                  item.title?.toLowerCase().includes(normalizedQuery) ||
                  item.name?.toLowerCase().includes(normalizedQuery)
              );
            }

            setMovies((prev) => [...prev, ...results]);
            setTotalPages(data.total_pages);
          })
          .catch((err) => console.error("Error fetching search:", err));
        return;
      }

      if (mediaType === "both") {
        const movieEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}&language=en-US`;
        const tvEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${pageNumber}&language=en-US`;

        Promise.all([fetch(movieEndpoint), fetch(tvEndpoint)])
          .then(async ([movieRes, tvRes]) => {
            const movieData = await movieRes.json();
            const tvData = await tvRes.json();
            const combined = [
              ...(movieData.results || []),
              ...(tvData.results || []),
            ];
            combined.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

            setMovies((prev) => [...prev, ...combined]);
            setTotalPages(Math.min(movieData.total_pages, tvData.total_pages));
          })
          .catch((err) => console.error("Error fetching both popular:", err));
        return;
      }

      // Only movie or TV popular
      const popularEndpoint = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&page=${pageNumber}&language=en-US`;

      fetch(popularEndpoint)
        .then((res) => res.json())
        .then((data) => {
          const results = data.results || [];
          setMovies((prev) => [...prev, ...results]);
          setTotalPages(data.total_pages);
        })
        .catch((err) => console.error("Error fetching popular:", err));
    },
    [searchQuery, mediaType]
  );

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
            <div className="card-title">{movie.title || movie.name}</div>
            <button
              onClick={() => toggleFavorite(movie.id)}
              className="favorite-btn"
            >
              {favorites[movie.id] ? "❤" : "♡"}
            </button>
          </div>
        ))}
      </div>

      {page < totalPages && (
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
