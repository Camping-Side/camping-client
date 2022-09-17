import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Link from "next/link";
import styles from "@cmStyles/module/header.module.scss";



export default function DrawerAppBar() {

    return (
        <div className={styles.appBar}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <a>CAMPOREST LOGO</a>
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Link href={'/search'}>
                        <Button
                            sx={{color: '#fff'}}
                        >
                            <SearchIcon/>
                        </Button>
                    </Link>
                    <span className=""></span>
                    <Link href={'/like'}>
                        <Button sx={{color: '#fff'}}>
                            <FavoriteBorderIcon/>
                        </Button>
                    </Link>
                    <Link href={'/cart'}>
                        <Button sx={{color: '#fff'}}>
                            <ShoppingBasketIcon/>
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </div>
    );
}