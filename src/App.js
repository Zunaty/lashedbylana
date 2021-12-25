import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Importing components to app
import Nav from './components/Nav';

// Importing pages to app
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#E5989B',
    },
    secondary: {
      main: '#B5838D',
    },
    success: {
      main: '#FFCDB2',
    },
    info: {
      main: '#4d7298',
    },
  }
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E5989B',
    },
    secondary: {
      main: '#B5838D',
    },
    success: {
      main: '#FFCDB2',
    },
    info: {
      main: '#4d7298',
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Nav />
        <Home />
        <Login />
        <Signup />
      </div>
    </ThemeProvider>
  );
}

export default App;
