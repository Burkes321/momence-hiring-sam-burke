import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html {
    color-scheme: ${({ theme }) => theme.mode};
    background: ${({ theme }) => theme.colors.background};
  }
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.typography.font};
    font-size: ${({ theme }) => theme.typography.body};
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  button, input, select { font: inherit; }
  button, input, select, a { -webkit-tap-highlight-color: transparent; }
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
  a { color: ${({ theme }) => theme.colors.accent}; text-underline-offset: 0.2em; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`
