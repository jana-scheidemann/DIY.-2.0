import Project from "@/components/Project";
import SearchField from "@/components/SearchField";
import styled from "styled-components";
import { StyledHeadlineH2 } from "@/components/StyledComponents/StyledHeadline";

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
        searchResults={searchResults}
      />

      <StyledHeadlineH2>Favorite Projects</StyledHeadlineH2>

      {favoriteProjects.length === 0 && (
        <p>
          No projects are selected as favorite OR adjust your search settings.
        </p>
      )}

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
