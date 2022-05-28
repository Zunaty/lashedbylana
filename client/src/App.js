import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from './utils/auth';

// MUI Theme Creation
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Importing components to app
import Nav from './components/Nav';
import Footer from './components/Footer';

// Importing pages to app
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/AboutMe';
import Price from './pages/Pricing';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const loggedIn = auth.loggedIn();

// Light mode theme colors
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

// Dark mode theme colors
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
});

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <header>
                    <Nav />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/price" element={<Price />} />
                        <Route element={<NoMatch />} />
                    </Routes>
                </main>

                <footer>
                    <Footer />
                </footer>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default App;