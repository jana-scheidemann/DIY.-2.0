import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
// import { StyledLink } from "./StyledComponents/StyledLink";
import { StyledHeadlineH2 } from "./StyledComponents/StyledHeadline";
import styled from "styled-components";
import Link from "next/link";

export default function Project({
  title,
  slug,
  duration,
  complexity,
  id,
  onToggleFavorite,
  isFavorite,
  image,
}) {
  return (
    <StyledContainer>
      <StyledArticle>
        <StyledLink href={`/projects/${slug}`}>
          <StyledHeadlineH2>{title}</StyledHeadlineH2>
        </StyledLink>
        <FavoriteButton
          id={id}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      </StyledArticle>
      <StyledLink href={`/projects/${slug}`}>
      <Image
        src={image}
        width={250}
        height={250}
        layout="responsive"
        alt={`Image of ${title}`}
      />

      <StyledArticleTags>
        <StyledArticleTag>
          Duration: <strong>{duration}</strong>
        </StyledArticleTag>
        <StyledArticleTag>
          Complexity: <strong>{complexity}</strong>
        </StyledArticleTag>
      </StyledArticleTags>
      </StyledLink>

    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: auto;
  height: auto;

  @media screen and (min-width: 600px) {
    width: 45%;
    height: auto;
    padding: 1%;
  }

  @media screen and (min-width: 900px) {
    width: 32%;
    height: auto;
    padding: 1%;
  }

  @media screen and (min-width: 1200px) {
    width: 25%;
    height: auto;
    padding: 1%;
  }
`;

const StyledArticle = styled.article`
  width: 100%;
  background-color: var(--darkblue);
  color: var(--lightbeige);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledLink = styled(Link)`
  color: var(--link-text);
  text-decoration: none;
  z-index: 2
`;

const StyledArticleTags = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 30px 10px;
`;

const StyledArticleTag = styled.p`
  font-size: 1.1em;
  font-weight: 400;
  margin: 0;
`;
