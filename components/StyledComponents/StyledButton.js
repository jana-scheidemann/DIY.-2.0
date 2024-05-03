import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: var(--coral);
  color: var(--text-color);
  width: 100px;
  text-align: center;
  border-radius: 20px;
  border: none;
  padding: 8px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1em;
  
`;
 export const StyledCancelButton = styled.button`
 position: absolute;
 top: 20px;
 right: 20px;
 cursor: pointer;
 border: none;
 background-color: transparent;
`;