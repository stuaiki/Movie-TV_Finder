// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MovieDetails.css";
import { Movie } from "../type/movie";

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Attempt to fetch movie details; if not found, try TV endpoint
  useEffect(() => {
    if (!id) return;
    const apiKey = "6f0ede065b4f9643843249b3d1ad379d";
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Movie not found");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        // Try as TV show if movie fetch fails
        fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("TV Show not found");
            }
            return res.json();
          })
          .then((data) => {
            setMovie(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching details:", err);
            setError("Unable to fetch movie details.");
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading details...</div>;
  }

  if (error || !movie) {
    return <div className="error">{error || "Movie not found."}</div>;
  }

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="details-poster"
      />
      <h1 className="details-title">{movie.title || movie.name}</h1>
      <p className="details-overview">{movie.overview}</p>
      <p className="details-info">
        Rating: {movie.vote_average} | Release Date: {movie.release_date}
      </p>
    </div>
  );
};
