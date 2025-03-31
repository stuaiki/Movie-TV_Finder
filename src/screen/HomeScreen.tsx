import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import "../css/Home.css";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching (replace with your actual API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="home">
      <Header />
      <SearchBar />
      <MovieCard />
    </div>
  );
};
