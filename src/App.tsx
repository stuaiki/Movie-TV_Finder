// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Home } from "./screen/HomeScreen";
import { MovieDetails } from "./screen/MovieDetails";
import { Favorites } from "./screen/Favorites";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <ErrorBoundary
          fallback={<div>Oops, something went wrong. Please refresh.</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
