// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesProvider"; // Note the updated path
import { Home } from "./screen/HomeScreen";
import { MovieDetails } from "./screen/MovieDetails";
import { Favorites } from "./screen/Favorites";
import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
