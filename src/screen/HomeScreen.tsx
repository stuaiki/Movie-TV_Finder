import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import "../css/Home.css";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv" | "both">("both");

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
      <MovieCard searchQuery={searchQuery} mediaType={mediaType} />
    </div>
  );
};
