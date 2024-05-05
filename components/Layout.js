import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { StyledHeadlineH1 } from "./StyledComponents/StyledHeadline";
import { useState } from "react";
import ModalAdd from "./ModalAdd";
import { StyledCancelButton } from "./StyledComponents/StyledButton";

export default function Layout({ children, onResetFilters, onAddProject }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  function toggleNavigation() {
    setIsNavigationOpen(!isNavigationOpen);
  }
  function toggleAddModal() {
    setIsNavigationOpen(!isNavigationOpen);
    setModalAdd(!modalAdd);
  }
  function closeAddModal() {
    setModalAdd(!modalAdd);
  }

  return (
    <>
      <StyledNavigation>
        <Link href="/" onClick={onResetFilters}>
          <StyledHeadlineH1>DIY.</StyledHeadlineH1>
        </Link>

        <div onClick={toggleNavigation}>
          <Image
            src="/icons/burger-menu.svg"
            width={40}
            height={40}
            alt="open navigation menu"
          />
        </div>
      </StyledNavigation>

      {isNavigationOpen && (
        <StyledNavigationMenu>
          <StyledCancelButton type="button" onClick={toggleNavigation}>
            <Image
              src="/icons/cancel.svg"
              width={40}
              height={40}
              alt="close navigation menu"
            />
          </StyledCancelButton>
          <StyledNavigationLink href="/" onClick={toggleNavigation}>
            home
          </StyledNavigationLink>
          <StyledNavigationLink
            href="/projects/favorites"
            onClick={toggleNavigation}
          >
            favorite projects
          </StyledNavigationLink>
          <StyledNavigationLink href="/" onClick={toggleAddModal}>
            add new project
          </StyledNavigationLink>
        </StyledNavigationMenu>
      )}

      {modalAdd && (
        <ModalAdd
          onAddProject={onAddProject}
          onToggleAddModal={closeAddModal}
        />
      )}

      {children}
    </>
  );
}
const StyledNavigation = styled.nav`
  position: sticky;
  top: 0;
  background-color: var(--lightbeige);
  height: 5em;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  z-index: 2;
`;

const StyledNavigationMenu = styled.nav`
  position: fixed;
  z-index: 3;
  top: 0;
  right: 0;
  width: 100%;
  height: fit-content;
  background-color: var(--darkred);
  transition-duration: 0.6s;
  animation-duration: 0.6s;
  animation-name: slideDown;
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
  display: flex;
  flex-direction: column;
`;

const StyledNavigationLink = styled(Link)`
  color: var(--lightbeige);
  font-size: 1.4em;
  font-weight: 500;
  margin: 0.5em 1em;
`;
