import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import "../css/Home.css";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type?: string;
  popularity?: number;
};

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv" | "both">("both");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="home">
      <Header
        isFavoriteView={showFavorites}
        onToggleFavorites={() => setShowFavorites((prev) => !prev)}
      />
      {!showFavorites && (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          mediaType={mediaType}
          setMediaType={setMediaType}
        />
      )}
      <MovieCard
        searchQuery={showFavorites ? "" : searchQuery}
        mediaType={showFavorites ? "both" : mediaType}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        movies={showFavorites ? favorites : undefined}
        isFavoriteView={showFavorites}
      />
    </div>
  );
};
