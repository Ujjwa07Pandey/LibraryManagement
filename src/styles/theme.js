import { createMuiTheme } from '@material-ui/core/styles';

 export const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#007FFF',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      secondary: {
       
        main: '#0073cf',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#fff',
      },
      
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
  });