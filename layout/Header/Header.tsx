import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const navItems = ['Home', 'About', 'Contact'];

export default function DrawerAppBar(props: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    CAMPOREST LOGO
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button sx={{color: '#fff'}}>
                            <SearchIcon></SearchIcon>
                        </Button>
                    <Button sx={{color: '#fff'}}>
                        <FavoriteBorderIcon></FavoriteBorderIcon>
                    </Button>
                    <Button sx={{color: '#fff'}}>
                        <ShoppingBasketIcon></ShoppingBasketIcon>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
