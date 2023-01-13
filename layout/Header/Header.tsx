import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";
import styles from "@cmStyles/module/header.module.scss";
import CommonStyles from "@cmStyles/module/common.module.scss";
import Logo from "/assets/img/common/logo.png";
import Btn_search from "/assets/img/header/btn_search.png";
import Btn_cart from "/assets/img/header/btn_cart.png";
import Btn_like from "/assets/img/header/btn_like.png";

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
          <Link href={"/"}>
            <img
              src={Logo.src}
              loading="lazy"
              className={CommonStyles.pointer}
            />
          </Link>
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link href={"/search"}>
            <Button>
              <img
                src={Btn_search.src}
                loading="lazy"
                className={CommonStyles.pointer}
              />
            </Button>
          </Link>
          <Link href={"/like"}>
            <Button>
              <img
                src={Btn_like.src}
                loading="lazy"
                className={CommonStyles.pointer}
              />
            </Button>
          </Link>
          <Link href={"/cart"}>
            <Button>
              <img
                src={Btn_cart.src}
                loading="lazy"
                className={CommonStyles.pointer}
              />
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </div>
  );
}
