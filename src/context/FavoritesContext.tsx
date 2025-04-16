import { createContext } from "react";
import { Movie } from "../type/movie";

export interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

// Create and export your context in its own file
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export default FavoritesContext;
