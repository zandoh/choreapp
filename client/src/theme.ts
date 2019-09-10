import { theme } from "@chakra-ui/core";

export const appTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      red: "#f7373c",
      orange: "#fcab44"
    },
    app: {
      lightGrey: "#d3d3d3"
    }
  }
};

export type AppTheme = typeof appTheme;
