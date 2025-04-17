// src/hooks/useFetchMovies.ts
import { useState, useEffect } from "react";
import { Movie, UseFetchMoviesProps } from "../type/movie";

/**
 * Custom hook to fetch movies from TMDB.
 * It returns movies, totalPages, isLoading, and error.
 */
const useFetchMovies = ({
  searchQuery,
  mediaType,
  page,
}: UseFetchMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      const apiKey = "6f0ede065b4f9643843249b3d1ad379d";

      try {
        if (searchQuery) {
          const endpoint = `https://api.themoviedb.org/3/search/${
            mediaType === "both" ? "multi" : mediaType
          }?api_key=${apiKey}&page=${page}&query=${encodeURIComponent(
            searchQuery
          )}&language=en-US&include_adult=false`;
          const response = await fetch(endpoint);
          const data = await response.json();
          // If page is 1 then set, otherwise append results
          setMovies((prev) =>
            page === 1 ? data.results || [] : [...prev, ...(data.results || [])]
          );
          setTotalPages(data.total_pages || 1);
        } else {
          if (mediaType === "both") {
            const movieEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&language=en-US`;
            const tvEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}&language=en-US`;

            const [movieRes, tvRes] = await Promise.all([
              fetch(movieEndpoint),
              fetch(tvEndpoint),
            ]);
            const movieData = await movieRes.json();
            const tvData = await tvRes.json();

            const combined = [
              ...(movieData.results || []),
              ...(tvData.results || []),
            ];
            // Optionally sort by popularity (highest first)
            combined.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

            setMovies((prev) =>
              page === 1 ? combined : [...prev, ...combined]
            );
            setTotalPages(Math.min(movieData.total_pages, tvData.total_pages));
          } else {
            const endpoint = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&page=${page}&language=en-US`;
            const response = await fetch(endpoint);
            const data = await response.json();
            setMovies((prev) =>
              page === 1
                ? data.results || []
                : [...prev, ...(data.results || [])]
            );
            setTotalPages(data.total_pages || 1);
          }
        }
      } catch (err) {
        console.error("Error fetching movies", err);
        setError("Error fetching movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, mediaType, page]);

  return { movies, totalPages, isLoading, error };
};

export default useFetchMovies;
