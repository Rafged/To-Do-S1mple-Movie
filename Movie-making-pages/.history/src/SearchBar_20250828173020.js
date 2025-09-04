import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleInput}
      className="p-2 w-full rounded-md text-black"
    />
  );
}

export default SearchBar;