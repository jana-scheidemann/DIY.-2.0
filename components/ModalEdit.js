import { useState } from "react";
import { uid } from "uid";
import StyledModal from "./StyledComponents/StyledModal";
import {
  StyledInputModal,
  StyledFormContainer,
  StyledRadioButton,
  StyledRadioButtonLabel,
} from "./StyledComponents/StyledInput";
import { StyledButton } from "./StyledComponents/StyledButton";
import {
  StyledHeadlineH3,
  StyledHeadlineH4,
  StyledHeadlineH5,
} from "./StyledComponents/StyledHeadline";
import Image from "next/image";

export default function ModalEdit({ currentProject, onSave, onCancel }) {
  const [updateProject, setUpdateProject] = useState(currentProject);
  const [selectSteps, setSelectSteps] = useState({});
  const [updateMaterials, setUpdateMaterials] = useState(
    currentProject.materials.join(", ")
  );
  const complexityLevels = ["Beginner", "Intermediate", "Advanced"];

  function handleChange(event) {
    const materialName = event.target.name;
    const materialValue = event.target.value;

    if (materialName === "materials") {
      setUpdateMaterials(materialValue);
      setUpdateProject((prevProject) => ({
        ...prevProject,
        [materialName]: materialValue
          .split(",")
          .map((material) => material.trim()),
      }));
    } else {
      setUpdateProject((prevProject) => ({
        ...prevProject,
        [materialName]: materialValue,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(updateProject);
  }

  function handleStepAdd(event) {
    event.preventDefault();
    setUpdateProject((prevState) => ({
      ...prevState,
      steps: [...prevState.steps, { id: uid(), desc: "" }],
    }));
  }

  function handleStepDelete(event) {
    event.preventDefault();
    setUpdateProject((prevState) => ({
      ...prevState,
      steps: prevState.steps.filter((step) => !selectSteps[step.id]),
    }));
    setSelectSteps({});
  }

  function handleStepSelect(id) {
    setSelectSteps((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  return (
    <StyledModal onCancel={onCancel}>
      <StyledFormContainer onSubmit={handleSubmit}>
        <StyledHeadlineH3>Edit Project</StyledHeadlineH3>
        <label htmlFor="title">
          <StyledHeadlineH4>Title</StyledHeadlineH4>
        </label>
        <StyledInputModal
          type="text"
          name="title"
          id="title"
          size="40"
          value={updateProject.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">
          <StyledHeadlineH4>Description</StyledHeadlineH4>
        </label>
        <StyledInputModal
          type="text"
          name="description"
          id="description"
          size="40"
          value={updateProject.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="materials">
          <StyledHeadlineH4>Materials</StyledHeadlineH4>
        </label>
        <StyledInputModal
          type="text"
          name="materials"
          id="materials"
          size="40"
          value={updateMaterials}
          onChange={handleChange}
          required
        />
        <label htmlFor="duration">
          <StyledHeadlineH4>Duration</StyledHeadlineH4>
        </label>
        <StyledInputModal
          type="text"
          name="duration"
          id="duration"
          size="40"
          value={updateProject.duration}
          onChange={handleChange}
          required
        />
        <StyledHeadlineH4>Complexity</StyledHeadlineH4>
        {complexityLevels.map((complexityLevel) => (
          <div key={complexityLevel}>
            <StyledRadioButtonLabel htmlFor={complexityLevel}>
              <StyledRadioButton
                type="radio"
                name="complexity"
                id={complexityLevel}
                value={complexityLevel}
                defaultChecked={updateProject.complexity === complexityLevel}
                onChange={handleChange}
              />
              {complexityLevel}
            </StyledRadioButtonLabel>
          </div>
        ))}
        <StyledHeadlineH4>Steps</StyledHeadlineH4>

        <div>
          <StyledButton onClick={handleStepAdd}>
            <Image
              src="/icons/add.svg"
              width={20}
              height={20}
              alt="add another step"
            />
          </StyledButton>
          <StyledButton onClick={handleStepDelete}>
            <Image
              src="/icons/delete.svg"
              width={20}
              height={20}
              alt="delete this step"
            />
          </StyledButton>
        </div>

        {updateProject.steps.map((step, stepIndex) => (
          <div key={step.id}>
            <StyledHeadlineH5>Step {stepIndex + 1} &nbsp;</StyledHeadlineH5>
            <label htmlFor={`step${stepIndex + 1}`}>
              <input
                type="checkbox"
                onChange={() => handleStepSelect(step.id)}
              />

              <StyledInputModal
                type="text"
                name={`step${stepIndex + 1}`}
                id={`step${stepIndex + 1}`}
                value={step.desc}
                onChange={(event) =>
                  setUpdateProject({
                    ...updateProject,
                    steps: updateProject.steps.map((updateStep) =>
                      updateStep.id === step.id
                        ? { ...updateStep, desc: event.target.value }
                        : updateStep
                    ),
                  })
                }
                size="40"
              />
            </label>
          </div>
        ))}

        <StyledButton type="submit">
          <strong>save all changes</strong>
        </StyledButton>
      </StyledFormContainer>
    </StyledModal>
  );
}
