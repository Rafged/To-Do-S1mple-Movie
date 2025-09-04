import React from "react";
import styled from "styled-components";

export default function Pagination({
  totalPosts,
  postPerPage,
  setPage,
  currentPage,
}) {
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Wrapper>
      <Button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>

      {pages.map((page) => (
        <PageNumber
          key={page}
          $active={currentPage === page}
          onClick={() => setPage(page)}
        >
          {page}
        </PageNumber>
      ))}

      <Button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 10px 0px 20px 0px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 4px 10px;
  cursor: pointer;
  color: #333;
  transition: 0.2s;
  border: none;
  font-size: 24px;
  vertical-align: middle;
  line-height: 1;

  &:hover:not(:disabled) {
    background-color: #eee;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  padding: 8px 10px 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  background-color: ${({ $active }) =>
    $active ? "rgba(24, 144, 255, 1)" : "transparent"};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  transition: 0.2s;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "rgba(24, 144, 255, 1)" : "#eee"};
  }
`;
