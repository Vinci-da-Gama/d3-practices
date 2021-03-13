import { createGlobalStyle } from "styled-components";

/**
 * setup global styling
 */
export const GlobalStyle = createGlobalStyle`
 body {
   margin: 0 auto;
   padding: 0;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   background-color: transparent;
   font-family: 'Roboto', Helvetica, Arial, sans-serif;
   font-stretch: normal;
   color: #000;
 }
`;
