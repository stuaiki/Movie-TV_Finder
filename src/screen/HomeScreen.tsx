// HomeScreen.tsx
import React, { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { LoadingIndicator } from "../components/LoadingIndicator";
import "../css/Home.css";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";
import ErrorBoundary from "../components/ErrorBoundary";

export const Home: React.FC = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv" | "both">("both");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="home">
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      <ErrorBoundary fallback={<div>Something went wrong loading movies.</div>}>
        <MovieCard
          searchQuery={searchQuery}
          mediaType={mediaType}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </ErrorBoundary>
    </div>
  );
};
