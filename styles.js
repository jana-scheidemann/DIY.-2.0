import { createGlobalStyle } from "styled-components";
import { Figtree } from "@next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

export default createGlobalStyle`

:root{
    --font-size: 18px;
    --text-color: #282828; //darkgrey
    --lightbeige: #F7EDE2; 
    --darkred: #D05C5A;
    --coral: #F5CAC3;
    --darkblue: #3D6D8E;
    --lightblue: #B8E8DC
    ;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    /* display: flex;
    flex-direction: column; */
    color: var(--text-color);
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: ${figtree.style.fontFamily};
    font-size: var(--font-size);
    background-color: var(--lightbeige);
  }

 a {
   text-decoration: none;
 }

 .Toastify__toast-body {
    font-family: ${figtree.style.fontFamily};
    font-size: 1.4em;
    font-weight: 500;
    color: var(--text-color);
    text-align: center;
    height: fit-content;
  }
`;
