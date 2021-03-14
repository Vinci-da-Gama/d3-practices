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
  header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1em;
    font-size: 1.2rem;
    background: blue;
    box-sizing: border-box;
    a {
      color: orange;
      text-decoration: none;
      &:hover {
        font-weight: bold;
        color: lightgrey;
      }
    }
    .active-link {
      color: red;
      &:hover {
        color: green;
      }
    }
  }
  .m-10 {
    margin: 10px;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
`;
