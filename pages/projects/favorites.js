import Project from "@/components/Project";
import SearchField from "@/components/SearchField";
// import { StyledSection } from "@/components/StyledComponents/StyledSection";
import StyledModalMessage from "@/components/StyledComponents/StyledModalMessage";
import styled from "styled-components";
import Link from "next/link";
import { StyledHeadlineH2 } from "@/components/StyledComponents/StyledHeadline";
import { StyledButton } from "@/components/StyledComponents/StyledButton";

export default function FavoritesPage({
  searchResults,
  handleSearch,
  query,
  onSortComplexityStartHigh,
  onSortComplexityStartLow,
  onSortDuration,
  onToggleFavorite,
  onFilterProjects,
  onResetFilters,
}) {
  const favoriteProjects = searchResults.filter((project) => {
    return project.favorite;
  });

  return (
    <>
      <SearchField
        handleSearch={handleSearch}
        query={query}
        onSortComplexityStartHigh={onSortComplexityStartHigh}
        onSortComplexityStartLow={onSortComplexityStartLow}
        onSortDuration={onSortDuration}
        onFilterProjects={onFilterProjects}
        onResetFilters={onResetFilters}
      />

      <StyledHeadlineH2>Favorite Projects</StyledHeadlineH2>

      <StyledSection>
        {favoriteProjects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            image={project.image}
            description={project.description}
            slug={project.slug}
            duration={project.duration}
            complexity={project.complexity}
            id={project.id}
            onToggleFavorite={onToggleFavorite}
            isFavorite={project.favorite}
          />
        ))}
      </StyledSection>

      {favoriteProjects.length === 0 && (
        <StyledModalMessage>
          <p>
            No results found. <br /> Please adjust your filter settings.
          </p>
          <StyledButton onClick={onResetFilters}>
            <Link href={"/projects/favorites"}>Show all favorites</Link>
          </StyledButton>
          <StyledButton><Link  href={"/"}>Home</Link></StyledButton>
        </StyledModalMessage>
      )}
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
