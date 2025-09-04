import styled from "styled-components";
import { format } from "date-fns";

export default function ArticlePreview({ article, noShadow }) {
  return (
    <Card $noShadow={noShadow}>
      <Left>
        <Title>{article.title}</Title>
        <Tags>
          {article.tagList.map((tag, idx) =>
            tag ? <Tag key={idx}>{tag}</Tag> : <div key={idx} />
          )}
        </Tags>
        <Bio $noShadow={noShadow}>{article.author.bio}</Bio>
      </Left>
      <Right>
        <Author>
          <span>{article.author.username}</span>
          <span>{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
        </Author>
        <Avatar src={article.author.image} alt="author" />
      </Right>
    </Card>
  );
}

// Styles

const Card = styled.li`
  margin-bottom: 25px;
  width: 938px;
  display: flex;
  height: 140px;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  box-shadow: ${({ $noShadow }) =>
    $noShadow ? "none" : "0 4px 12px rgba(0, 0, 0, 0.15)"};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.p`
  font-size: 20px;
  color: rgba(54, 110, 255, 1);
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.p`
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 2px;
`;

const Bio = styled.p`
  color: ${({ $noShadow }) =>
    $noShadow ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.75)"};
`;

const Right = styled.div`
  display: flex;
  gap: 12px;
  text-align: end;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 18px;
  }

  span:nth-child(2) {
    color: rgb(154, 146, 146);
  }
`;

const Avatar = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;
