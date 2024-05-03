import styled from "styled-components";

export default function StyledModalMessage({ children }) {
  return (
    <StyledPageBackground>
      <StyledModalContainer>{children}</StyledModalContainer>
    </StyledPageBackground>
  );
}

const StyledPageBackground = styled.div`
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--text-color);
`;

const StyledModalContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  position: fixed;
  z-index: 6;
  top: calc(30%);
  right: calc(5%);
  bottom: calc(5%);
  left: calc(5%);
  background-color: var(--lightbeige);
  border-radius: 20px;
  padding: 10px 20px 30px 20px;
`;
