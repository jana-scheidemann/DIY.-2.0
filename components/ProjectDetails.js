import styled from "styled-components";
import { useState } from "react";
import router from "next/router";
import Image from "next/image";
import ModalDelete from "@/components/ModalDelete";
import ModalEdit from "@/components/ModalEdit";
import FavoriteButton from "./FavoriteButton";
import {
  StyledButton,
  StyledButtonContainer,
} from "./StyledComponents/StyledButton";
import {
  StyledHeadlineH2,
  StyledHeadlineH3,
} from "./StyledComponents/StyledHeadline";

export default function ProjectDetails({
  currentProject,
  onDeleteProject,
  onToggleFavorite,
  onEditProject,
}) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const {
    id,
    title,
    description,
    materials,
    duration,
    complexity,
    steps,
    image,
  } = currentProject;

  function handleEdit() {
    setModalEdit(true);
  }

  function handleEditCancel() {
    setModalEdit(false);
  }

  function handleEditConfirm(updatedProject) {
    setModalEdit(false);
    onEditProject(updatedProject);
  }

  function handleDelete() {
    setModalDelete(true);
  }

  function handleDeleteCancel() {
    setModalDelete(false);
  }

  function handleDeleteConfirm() {
    onDeleteProject(id);
    setModalDelete(false);
    router.push("/");
  }

  return (
    <>
      <StyledArticle>
        <StyledHeadlineH2>{title}</StyledHeadlineH2>
        <FavoriteButton
          id={id}
          onToggleFavorite={onToggleFavorite}
          isFavorite={currentProject.favorite}
        />
      </StyledArticle>

      <StyledArticleTags>
        <StyledArticleTag>
          Duration: <strong>{duration}</strong>
        </StyledArticleTag>
        <StyledArticleTag>
          Complexity: <strong>{complexity}</strong>
        </StyledArticleTag>
      </StyledArticleTags>

      <StyledArticleDescription>{description}</StyledArticleDescription>

      <Image
        src={image}
        width={414}
        height={400}
        // layout="responsive"
        alt={`Image of ${title}`}
      />

      <StyledHeadlineH3>Materials:</StyledHeadlineH3>
      <StyledUList>
        {materials.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </StyledUList>
      <StyledHeadlineH3>Steps:</StyledHeadlineH3>
      <StyledOList>
        {steps.map((step) => (
          <li key={step.id}>{step.desc}</li>
        ))}
      </StyledOList>
      <StyledButtonContainer>
        <StyledButton onClick={handleEdit}>Edit</StyledButton>
        <StyledButton onClick={handleDelete}>Delete</StyledButton>
      </StyledButtonContainer>

      {modalEdit && (
        <ModalEdit
          currentProject={currentProject}
          onSave={handleEditConfirm}
          onCancel={handleEditCancel}
        />
      )}
      {modalDelete && (
        <ModalDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}

const StyledArticle = styled.article`
  width: 100%;
  background-color: var(--lightblue);
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledArticleDescription = styled.p`
  font-size: 1.2em;
  font-weight: 400;
  margin: 20px;
`;

const StyledUList = styled.ul`
  margin-top: 0;
`;

const StyledOList = styled.ol`
  margin-top: 0;
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
