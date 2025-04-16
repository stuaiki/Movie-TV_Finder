// src/types/movie.ts

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type?: string;
  popularity?: number;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

export interface MovieCardProps {
  searchQuery: string;
  mediaType: "movie" | "tv" | "both";
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  movies?: Movie[]; // Optional prop for favorites view
  isFavoriteView?: boolean;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mediaType: "movie" | "tv" | "both";
  setMediaType: (type: "movie" | "tv" | "both") => void;
}
