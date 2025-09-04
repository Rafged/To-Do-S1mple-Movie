import useFetchData from "../Hooks/useFetchData";
import { Link } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";
import styled from "styled-components";

export default function Articles() {
  const { totalPosts, currentPosts, page, setPage, postPerPage } =
    useFetchData();

  if (!currentPosts.length) return <div className="loader" />;

  return (
    <>
      <List>
        {currentPosts.map((obj) => (
          <StyledLink to={`/articles/${obj.slug}`} key={obj.slug}>
            <ArticlePreview article={obj} />
          </StyledLink>
        ))}
      </List>
      <Pagination
        totalPosts={totalPosts}
        postPerPage={postPerPage}
        setPage={setPage}
        currentPage={page}
      />
    </>
  );
}

// Styles
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
