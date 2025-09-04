import React from "react";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p className="text-gray-400 mt-4">Start typing to search for movies</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 p-3 rounded-lg">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          <h3 className="text-white text-sm">{movie.title}</h3>
          <p className="text-gray-400 text-xs">⭐ {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;