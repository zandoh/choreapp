import { theme } from "@chakra-ui/core";

export const appTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      red: "#f7373c",
      orange: "#fcab44",
      gradient: `linear-gradient(
        45deg,
        rgba(247, 55, 60, 1) 0%,
        rgba(252, 171, 68, 1) 100%
      );`
    },
    app: {
      lightGrey: "#d3d3d3",
      green: "#61B07F"
    }
  }
};

export type AppTheme = typeof appTheme;
