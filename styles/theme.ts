import { theme, DefaultTheme } from "@chakra-ui/core";

export const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "Roboto, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  radii: {
    ...theme.radii,
    sm: "5px",
    md: "8px",
  },
  colors: {
    ...theme.colors,
    pink: {
      ...theme.colors.pink,
      400: "#7400b8",
      500: "#6930c3",
    },

    blue: {
      ...theme.colors.blue,
      400: "#5e60ce",
      500: "#3f37c9",
    },
  },
};
