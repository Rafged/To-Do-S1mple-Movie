import React, { useState } from "react";
import { Input } from "antd";
import MovieList from "./MovieList";

const { Search } = Input;

function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Movie Search App</h1>
      <Search
        placeholder="Search for a movie"
        enterButton="Search"
        size="large"
        onSearch={(value) => setQuery(value)}
      />
      <div style={{ marginTop: 20 }}>
        <MovieList query={query} />
      </div>
    </div>
  );
}

export default App;
