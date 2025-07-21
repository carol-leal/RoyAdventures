import { createTheme } from "@mui/material";

const primaryScale = {
  900: "#1f4ab9",
  800: "#206ad9",
  700: "#1f7ceb",
  600: "#1e8fff", // Primary and Main color
  500: "#189dff",
  400: "#3dacff",
  300: "#62bbff",
  200: "#91cfff",
  100: "#bce1ff",
  50: "#e3f3ff",
};

const secondaryScale = {
  900: "#e85518",
  800: "#f26f1a",
  700: "#f87f1c",
  600: "#ff8f1e", // Main color
  500: "#ff9a20",
  400: "#ffa935",
  300: "#ffb956",
  200: "#ffcd85",
  100: "#ffe1b5",
  50: "#fff3e1",
};

const analogousPrimaryScale = {
  900: "#008c83",
  800: "#00b2b4",
  700: "#00c7ce",
  600: "#00deeb",
  500: "#00f0ff",
  400: "#00f5fe",
  300: "#00fbff",
  200: "#1effff", // Main color
  100: "#9cfffd",
  50: "#d9fffe",
};

const analogousSecondaryScale = {
  900: "#0000ef",
  800: "#000ff3",
  700: "#0015f7",
  600: "#1e1eff", // Main color
  500: "#3b22ff",
  400: "#6b49ff",
  300: "#8d6cff",
  200: "#b198ff",
  100: "#d2c2ff",
  50: "#eee6ff",
};

const triadicPrimaryScale = {
  900: "#4400e5",
  800: "#6200eb",
  700: "#7203f0",
  600: "#8317f8",
  500: "#8f1eff", // Main color
  400: "#a24eff",
  300: "#b574ff",
  200: "#cb9fff",
  100: "#e0c6ff",
  50: "#f4e8ff",
};

const triadicSecondaryScale = {
  900: "#9a0064",
  800: "#c2006b",
  700: "#d8006e",
  600: "#ef0074",
  500: "#ff0077",
  400: "#ff1e8f", // Main color
  300: "#fe57a5",
  200: "#fd8bc0",
  100: "#fdbad9",
  50: "#fee4f0",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryScale[600],
      light: primaryScale[400],
      dark: primaryScale[800],
    },
    secondary: {
      main: secondaryScale[600],
      light: secondaryScale[400],
      dark: secondaryScale[800],
    },
    background: {
      default: "#F0F0F0",
      paper: "#FFFFFF",
    },
  },
});

export default theme;
