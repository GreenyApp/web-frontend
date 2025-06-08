// src/theme.ts
import { createGlobalStyle } from 'styled-components';
import type { DefaultTheme } from 'styled-components';

export const colors = {
    primary: '#2e7d32',
    primaryLight: '#60ad5e',
    primaryDark: '#005005',
    secondary: '#81c784',
    background: '#f1f8e9',
    text: '#212121',
    textLight: '#f5f5f5',
    danger: '#c62828',
    dangerDark: '#b71c1c',
    warning: '#ff8f00',
    success: '#2e7d32',
    info: '#1976d2',
    white: '#ffffff',
    lightGray: '#eee',
    mediumGray: '#ddd',
    darkGray: '#888',
    veryLightGray: '#ccc',
};

export const fonts = {
    main: "'Roboto', Arial, sans-serif",
};

export const breakpoints = {
    mobile: '768px',
    tablet: '1024px',
};

export const theme: DefaultTheme = {
    colors,
    fonts,
    breakpoints,
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.main};
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;

// Add this to your `styled.d.ts` or directly in `theme.ts` if you prefer
// For styled-components DefaultTheme typing
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
    breakpoints: typeof breakpoints;
  }
}