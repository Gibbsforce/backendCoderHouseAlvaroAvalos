import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
    :root {
        --maxWidth: 1200px;
        --white: #fff;
        --black: #000;
        --gray: #ccc;
        --lightGray: #eee;
        --mediumGray: #353535;
        --darkGray: #1c1c1c;
        --fontSuperbig: 2rem;
        --fontBig: 1.5rem;
        --fontMedium: 1.2rem;
        --fontSmall: 1rem;
        --fontSuperSmall: 0.8rem;
    }
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
    background-color: rgba(54, 54, 56, 0.137);

        h1 {
            font-size: var(--fontSuperbig);
        }
        h3 {
            font-size: 1.1rem;
        }
        p {
            font-size: var(--fontBig);
        }
    }
`