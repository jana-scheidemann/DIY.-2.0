import { uid } from "uid";
import { useState } from "react";
import { initialProjects } from "@/db/data";
import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
// import Link from "next/link";
import StyledModalMessage from "@/components/StyledComponents/StyledModalMessage";
// import styled from "styled-components";
import Fuse from "fuse.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledButton } from "@/components/StyledComponents/StyledButton";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  const [projects, setProjects] = useState(initialProjects);
  const [projectFilter, setProjectFilter] = useState({});
  const [query, setQuery] = useState("");

  // ---ADD, DELETE, EDIT---
  function handleAddProject(newProject) {
    setProjects([{ id: uid(), ...newProject }, ...projects]);
    notify("Congratulations. You successfully added a new project!");
  }
  function handleDeleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
    notify("Project successfully deleted.");
  }
  function handleEditProject(updatedProject) {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    notify("You successfully edited this project.");
  }
  function notify(message) {
    toast(message);
  }

  // ---SORT---
  const complexityOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };

  function handleSortComplexityStartHigh() {
    setProjects(
      projects.toSorted((a, b) => {
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      })
    );
  }

  function handleSortComplexityStartLow() {
    setProjects(
      projects.toSorted((a, b) => {
        return complexityOrder[a.complexity] - complexityOrder[b.complexity];
      })
    );
  }

  function durationToHours(duration) {
    const durationValue = parseInt(duration);
    if (duration.toLowerCase() && duration.includes("hour")) {
      return durationValue;
    } else if (duration.toLowerCase() && duration.includes("day")) {
      return durationValue * 24;
    } else if (duration.toLowerCase() && duration.includes("week")) {
      return durationValue * 24 * 7;
    } else if (duration.toLowerCase() && duration.includes("month")) {
      return durationValue * 24 * 30;
    } else if (duration.toLowerCase() && duration.includes("year")) {
      return durationValue * 24 * 365;
    }
    return duration;
  }
  function handleSortDuration(direction) {
    setProjects(
      projects.toSorted((a, b) => {
        const durationA = durationToHours(a.duration);
        const durationB = durationToHours(b.duration);
        return direction === "long"
          ? durationB - durationA
          : durationA - durationB;
      })
    );
  }

  // --- FILTER ---
  function resetProjectFilter() {
    setProjectFilter({});
  }
  function handleProjectFilter(filterData) {
    setProjectFilter(filterData);
  }

  const filteredProjects = projects.filter((project) => {
    let durationMatch = true;
    if (projectFilter.duration) {
      if (projectFilter.duration === "short") {
        durationMatch = durationToHours(project.duration) <= 2;
      } else if (projectFilter.duration === "medium") {
        durationMatch =
          durationToHours(project.duration) > 2 &&
          durationToHours(project.duration) <= 23;
      } else if (projectFilter.duration === "long") {
        durationMatch = durationToHours(project.duration) > 23;
      }
    }

    let complexityMatch = true;
    if (projectFilter.complexity) {
      complexityMatch = project.complexity === projectFilter.complexity;
    }

    return durationMatch && complexityMatch;
  });

  const displayedProjects =
    Object.keys(projectFilter) === 0 ? projects : filteredProjects;

  // ---SEARCH---
  const fuse = new Fuse(projects, {
    keys: ["title", "description", "materials", "steps.desc"],
    includeScore: true,
    threshold: 0.3,
    shouldSort: true,
    ignoreLocation: true,
    ignoreFieldNorm: true,
  });
  const results = fuse.search(query);
  const searchResults = query
    ? results.map((result) => result.item)
    : displayedProjects;

  function handleSearch(event) {
    const { value } = event.target;
    setQuery(value);
  }

  // ---FAVORITE---
  function handleToggleFavorite(id) {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      )
    );
  }

  return (
    <>
      <Layout
        onResetFilters={resetProjectFilter}
        onAddProject={handleAddProject}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <GlobalStyle />
        <Component
          {...pageProps}
          projects={displayedProjects}
          searchResults={searchResults}
          query={query}
          handleSearch={handleSearch}
          onDeleteProject={handleDeleteProject}
          onFilterProjects={handleProjectFilter}
          onResetFilters={resetProjectFilter}
          onToggleFavorite={handleToggleFavorite}
          onEditProject={handleEditProject}
          onSortComplexityStartHigh={handleSortComplexityStartHigh}
          onSortComplexityStartLow={handleSortComplexityStartLow}
          onSortDuration={handleSortDuration}
        />

        {searchResults.length === 0 && (
          <StyledModalMessage>
            <p>
              No results found. <br /> Please adjust your search settings.
            </p>
            <StyledButton onClick={resetProjectFilter}>
              <Link href={"/"}>Back</Link>
            </StyledButton>
          </StyledModalMessage>
        )}
      </Layout>
    </>
  );
}
