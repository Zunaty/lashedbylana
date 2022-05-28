import * as React from 'react';

// MUI Material Components
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Popover,
    Container,
    Button,
    ButtonGroup,
    Link
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

// Authentication
import Auth from '../../utils/auth';

export default function Nav() {

    // Popover menu button stat handling
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Buttons for popover menu
    const buttons = [
        <Button href="/" key="home">Home</Button>,
        <Button href="/about" key="about">About Me</Button>,
        <Button href="/price" key="price">Pricing</Button>,
    ]

    // Checking if user is logged in, then displaying proper options in popover menu
    function navigationCheck() {
        if (Auth.loggedIn()) {
            return (
                <Container>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                    >
                        {/* Grabing constant buttons */}
                        {buttons}

                        <Button href="/">
                            Sign Out
                        </Button>
                    </ButtonGroup>
                </Container>
            );
        } else {
            return (
                <Container>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                        sx={{ mt: 1 }}
                    >
                        {/* Grabing constant buttons */}
                        {buttons}

                        <Button href="/login" key="login">
                            Sign In
                        </Button>

                        <Button href="/signup" key="signup"
                            variant="outlined"
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Sign Up!
                        </Button>
                    </ButtonGroup>
                </Container>
            );
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Title */}
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" underline="none" color="inherit">
                            Lashed By Lana
                        </Link>
                    </Typography>

                    {/* Burger Button */}
                    <IconButton
                        // Popover
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}

                        // Button style
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Popover Menu */}
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {navigationCheck()}
                    </Popover>
                </Toolbar>
            </AppBar>
        </Box>
    );
};