import { useEffect, useState } from "react";

export default function useFetchData() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(5);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(
        `https://realworld.habsidev.com/api/articles`
      );
      if (!response.ok) throw new Error("Failed to load articles");
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, [page]);
  const lastPostIndex = page * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = articles.slice(firstPostIndex, lastPostIndex);
  const totalPosts = articles.length;

  return {
    totalPosts,
    currentPosts,
    page,
    setPage,
    postPerPage,
  };
}
