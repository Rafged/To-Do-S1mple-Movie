import { useEffect, useState } from "react";
import { Spin, Alert, Card } from "antd";


function MovieList({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" tip="Loading movies..." />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!navigator.onLine) {
    return <Alert message="No Internet Connection" type="warning" showIcon />;
  }

  return (
    <div>
      {movies.length > 0 ? (
        movies.map((m) => (
          <Card key={m.id} title={m.title} style={{ marginBottom: 15 }}>
            <p>Release Date: {m.release_date}</p>
            <p>{m.overview}</p>
          </Card>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default MovieList;
