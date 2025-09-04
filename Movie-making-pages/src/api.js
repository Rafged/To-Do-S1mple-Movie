const API_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  const res = await fetch(
    `${API_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
  );
  if (!res.ok) throw new Error("Ошибка API");
  const data = await res.json();
  return data.results;
}