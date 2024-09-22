import { colors } from '@/theme'
import { createGlobalStyle } from 'styled-components'
import { Raleway } from 'next/font/google'
import { Open_Sans } from 'next/font/google'

const RalewayFont = Raleway({
  weight: ['200', '400', '500', '700'],
  subsets: ['latin'],
  style: 'normal',
})

const OpenSansFont = Open_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  style: 'normal',
})

const createCssVariable = (items: any): string[] => {
  return Object.keys(items).flatMap((key) => `--${key}: ${items[key]};`)
}

const GlobalStyle = createGlobalStyle`
    :root {
        -webkit-font-smoothing: antialiased;
        ${createCssVariable(colors)}

        --font-raleway: ${RalewayFont.style.fontFamily};
        --font-open-sans: ${OpenSansFont.style.fontFamily};

        --h1-min-size: 40.00px;
        --h1-max-size: 76.00px;
        --h1-font-size: clamp(var(--h1-min-size), 5.5vw, var(--h1-max-size));

        --h2-min-size: 33.00px;
        --h2-max-size: 68.00px;
        --h2-font-size: clamp(var(--h2-min-size), 5.5vw, var(--h2-max-size));

        --h3-min-size: 19.00px;
        --h3-max-size: 22.00px;
        --h3-font-size: clamp(var(--h3-min-size), 5.5vw, var(--h3-max-size));

        --h4-min-size: 14.00px;
        --h4-max-size: 14.00px;
        --h4-font-size: clamp(var(--h4-min-size), 5.5vw, var(--h4-max-size));

        --h5-min-size: 16.00px;
        --h5-max-size: 20.00px;
        --h5-font-size: clamp(var(--h5-min-size), 5.5vw, var(--h5-max-size));
        
        --p-min-size: 16.00px;
        --p-max-size: 16.00px;
        --p-font-size: clamp(var(--p-min-size), 5.5vw, var(--p-max-size));

        --subtitle-min-size: 16.00px;
        --subtitle-max-size: 17.00px;
        --subtitle-font-size: clamp(var(--subtitle-min-size), 5.5vw, var(--subtitle-max-size));

        --h1-mobile-line-height: 114.7%;
        --h1-desktop-line-height: 105.7%;

        --h2-mobile-line-height: 133.5%;
        --h2-desktop-line-height: 105.7%;

        --h3-mobile-line-height: 133.5%;
        --h3-desktop-line-height: 105.7%;

        --h4-mobile-line-height: 147.2%;
        --h4-desktop-line-height: 133.6%;

        --h5-mobile-line-height: 126.7%;
        --h5-desktop-line-height: 126.7%;

        --p-mobile-line-height: 142.5%;
        --p-desktop-line-height: 24px;

        --opacity-hover: 0.65;
        --max-width:  48.75rem;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-raleway);
      font-weight: 500;
      font-style: normal;
      letter-spacing: -2%;
    }

    p, a, button, input, label {
      font-family: var(--font-open-sans);
      letter-spacing: 3.5%;
      color: black;
    }

    a {
      color: inherit;
      transition: opacity 0.25s ease-in-out;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  
    html {
      -moz-text-size-adjust: none;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
      color: #000 !important;
    }
  
    :focus-visible {
      outline-color: var(--link);
      outline-style: solid;
      outline-width: 1px;
    }

    body {
      background-color: var(--backgroundGrey);
    }
  
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
      margin: 0;
    }
  
    ul,
    ol {
      list-style: none;
      margin: 0;
    }
  
    html {
      font-family: var(--font-maven);
      font-weight: var(--font-weight-regular);
      font-size: inherit;
      color: inherit;
    }
  
    body {
      min-height: 150vh;
      line-height: 1.5;
      height: 100%;
      font-size: 16px;
    }
  
    h1,
    h2,
    h3,
    h4,
    button,
    input,
    label {
      line-height: 1.1;
    }
  
    a:not([class]) {
      text-decoration-skip-ink: auto;
      color: currentColor;
    }
    
    img,
    picture {
      max-width: 100%;
      display: block;
    }
  
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    .animate {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;
    }
    
    .animate-opaque {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;
    }

    .animate-opaque.animated {
      opacity: 1;
      transform: translateY(0);
    }

    .ignore {
      opacity: 1;
      transform: translateY(0);
    }

    .animated {
      opacity: 1;
      transform: translateY(0);
    }

      #contact {
    width: 100%;
  }

    
  `

export default GlobalStyle
