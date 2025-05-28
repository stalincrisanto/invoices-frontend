import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette creado por la herramienta de Material UI
  // lo que se podría cambiar es poner el light y dark de acuerdo a lo enviado por comunicacion
  palette: {
    primary: {
      main: "#173a74",
      light: "#45618F",
      dark: "#102851",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4678b2",
      light: "#6B93C1",
      dark: "#31547C",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d1323e",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#173a74",
      secondary: "#264d86",
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#4678b2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.3rem',
      color: '#94caf2',
    },
    h6: {
      fontSize: '0.9rem',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  }
});

export default theme;
