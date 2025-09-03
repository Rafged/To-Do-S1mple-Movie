import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import { searchMovies } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки фильмов");
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-white mb-4">🎬 Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-400 mt-2">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;