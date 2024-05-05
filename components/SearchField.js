import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import {
  StyledInputSearch,
  StyledSearchIcon,
  StyledSearchItem,
  StyledInputSearchField,
  StyledInputSearchFieldContainer,
  StyledRadioButton,
} from "./StyledComponents/StyledInput";
import {
  StyledButton,
  StyledButtonContainer,
} from "./StyledComponents/StyledButton";
import {
  StyledHeadlineH4,
  StyledHeadlineH5,
} from "./StyledComponents/StyledHeadline";

export default function SearchField({
  onSortComplexityStartHigh,
  onSortComplexityStartLow,
  onSortDuration,
  query,
  handleSearch,
  onFilterProjects,
  onResetFilters,
  searchResults,
}) {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  function handleSort(event) {
    event.preventDefault();
    const searchOption = event.target.value;
    if (searchOption === "duration-short") {
      onSortDuration("short");
    } else if (searchOption === "duration-long") {
      onSortDuration("long");
    } else if (searchOption === "complexity-low") {
      onSortComplexityStartLow();
    } else if (searchOption === "complexity-high") {
      onSortComplexityStartHigh();
    }
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filterData = Object.fromEntries(formData);
    onFilterProjects(filterData);
  }

  function openSort() {
    setIsOpenSort(!isOpenSort);
  }
  function openFilter() {
    setIsOpenFilter(!isOpenFilter);
  }

  return (
    <>
      <StyledInputSearch>
        <StyledSearchItem>
          <StyledButtonSearch type="button" onClick={openSort}>
            <StyledImage
              src={
                isOpenSort
                  ? "/icons/icon-sort-active.png"
                  : "/icons/icon-sort.svg"
              }
              width={35}
              height={35}
              alt={"Sort projects"}
            />
          </StyledButtonSearch>
        </StyledSearchItem>

        <StyledSearchItem>
          <StyledButtonSearch type="button" onClick={openFilter}>
            <StyledImage
              src={
                isOpenFilter
                  ? "/icons/icon-filter-active.png"
                  : "/icons/icon-filter.svg"
              }
              width={35}
              height={35}
              alt={"Filter projects"}
            />
          </StyledButtonSearch>
        </StyledSearchItem>

        <label htmlFor="search"></label>
        <StyledInputSearchFieldContainer>
          <StyledInputSearchField
            type="search"
            id="search"
            name="search"
            placeholder="for title, material etc."
            value={query}
            onChange={handleSearch}
          />
          <StyledSearchIcon>
            <Image
              src={"/icons/icon-magnifier.svg"}
              width={20}
              height={20}
              alt={"search projects"}
            />
          </StyledSearchIcon>
        </StyledInputSearchFieldContainer>
      </StyledInputSearch>

      {isOpenSort && (
        <>
          <label htmlFor="sort" />

          <StyledDropdown name="sort" id="sort" onChange={handleSort}>
            <option value="">-- choose sort option --</option>
            <option value="duration-short">Duration: short to long</option>
            <option value="duration-long">Duration: long to short</option>
            <option value="complexity-low">
              Complexity: Beginner to Advanced
            </option>
            <option value="complexity-high">
              Complexity: Adcanced to Beginner
            </option>
          </StyledDropdown>
        </>
      )}

      {isOpenFilter && (
        <StyledForm onSubmit={handleFilterSubmit}>
          <StyledHeadlineH4>Filter projects by ...</StyledHeadlineH4>

          <StyledFilterContainer>
            <StyledHeadlineH5>Duration:</StyledHeadlineH5>
            <label htmlFor="duration-short">
              <input
                type="radio"
                id="duration-short"
                name="duration"
                value="short"
              />
              &lt; 2 hours
            </label>

            <label htmlFor="duration-medium">
              <input
                type="radio"
                id="duration-medium"
                name="duration"
                value="medium"
              />
              2 - 23 hours
            </label>

            <label htmlFor="duration-long">
              <input
                type="radio"
                id="duration-long"
                name="duration"
                value="long"
              />
              &gt; 23 hours
            </label>
          </StyledFilterContainer>

          <StyledFilterContainer>
            <StyledHeadlineH5>Complexity:</StyledHeadlineH5>
            <label htmlFor="beginner">
              <input
                type="radio"
                id="beginner"
                name="complexity"
                value="Beginner"
              />
              Beginner
            </label>
            <label htmlFor="intermediate">
              <input
                type="radio"
                id="intermediate"
                name="complexity"
                value="Intermediate"
              />
              Intermediate
            </label>
            <label htmlFor="advanced">
              <input
                type="radio"
                id="advanced"
                name="complexity"
                value="Advanced"
              />
              Advanced
            </label>
          </StyledFilterContainer>
          <StyledButtonContainer>
            <StyledButton type="submit">Apply</StyledButton>
            <StyledButton type="reset" value="Clear">
              Clear
            </StyledButton>
            <StyledButton type="button" onClick={onResetFilters}>
              Reset
            </StyledButton>
          </StyledButtonContainer>
        </StyledForm>
      )}

      {searchResults.length === 0 && (
        <p>No results found. Please adjust your search settings.</p>
      )}
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: fit-content;
  margin: 1em;
  padding-left: 1em;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  font-size: 16px;
`;

const StyledButtonSearch = styled.button`
  background-color: transparent;
  border: none;
`;

const StyledDropdown = styled.select`
  height: 2em;
  background-color: white;
  color: var(--text-color);
  padding-left: 5px;
  font-size: var(--font-size);
  border: none;
  margin: 0px 0px 20px 35px;

  &:focus {
    outline-color: var(--coral);
  }

  &:hover {
    cursor: pointer;
  }
`;
