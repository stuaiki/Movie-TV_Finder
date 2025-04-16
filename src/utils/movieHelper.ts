// src/utils/movieHelpers.ts
import { Movie } from "../type/movie";

/**
 * Sorts an array of movies by their popularity in descending order.
 * @param movies - Array of Movie objects.
 * @returns A new array sorted by popularity (highest first).
 */
export const sortMoviesByPopularity = (movies: Movie[]): Movie[] => {
  return movies
    .slice()
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
};

/**
 * Filters an array of movies based on the provided keyword.
 * It checks if the movie's title or name includes the keyword (case-insensitive).
 * @param movies - Array of Movie objects.
 * @param keyword - The search term.
 * @returns A new array containing movies that match the search term.
 */
export const filterMoviesByKeyword = (
  movies: Movie[],
  keyword: string
): Movie[] => {
  if (!keyword.trim()) return movies; // Return all if no keyword provided
  const lowerKeyword = keyword.toLowerCase();
  return movies.filter((movie) => {
    const title = movie.title || movie.name || "";
    return title.toLowerCase().includes(lowerKeyword);
  });
};
