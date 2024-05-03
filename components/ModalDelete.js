import { StyledButton } from "./StyledComponents/StyledButton";
import StyledModalMessage from "./StyledComponents/StyledModalMessage";

export default function ModalDelete({ onConfirm, onCancel }) {
  return (
    <StyledModalMessage>
      <p>Are you sure you want to delete this project?</p>
      <StyledButton type="button" onClick={onConfirm}>
        Yes
      </StyledButton>
      <StyledButton type="button" onClick={onCancel}>
        No
      </StyledButton>
    </StyledModalMessage>
  );
}
