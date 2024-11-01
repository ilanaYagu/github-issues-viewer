import { createTheme, ThemeOptions } from "@mui/material/styles";

const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#c9d1d9",
      secondary: "#8b949e",
    },
    action: {
      hover: "#1f2730",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "& a": {
            color: "#4f83cc",
          },
        },
      },
    },
  },
});

export default darkTheme;
