import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  * {
    box-sizing: border-box;
    font-size: 16px;
  }
`;

export default GlobalStyle;
