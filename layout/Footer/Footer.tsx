import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import styles from "@cmStyles/module/footer.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import SmsIcon from "@mui/icons-material/Sms";
import PersonIcon from "@mui/icons-material/Person";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const MenuButton = styled(Box)`
  cursor: pointer;
`;

export default function BottomAppBar() {
  const router = useRouter();

  return (
    <Box className={styles.footerBar + " layoutWidth"}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          marginRight: 3,
          marginLeft: 3,
          zIndex: 5,
        }}
      >
        <Link href={"/"} passHref>
          <a>
            <MenuButton
              sx={{ color: router.pathname === "/" ? "#5bbd6b" : "#A7A7A7" }}
            >
              <HomeIcon />
              <br />
              <Typography>홈</Typography>
            </MenuButton>
          </a>
        </Link>
        <Link href={"/shop"} passHref>
          <a>
            <MenuButton
              sx={{
                color: router.pathname.startsWith("/shop")
                  ? "#5bbd6b"
                  : "#A7A7A7",
              }}
            >
              <ShoppingCartIcon />
              <br />
              <Typography>상점</Typography>
            </MenuButton>
          </a>
        </Link>
        <Link href={"/info"} passHref>
          <a>
            <MenuButton
              sx={{
                color: router.pathname.startsWith("/info")
                  ? "#5bbd6b"
                  : "#A7A7A7",
              }}
            >
              <EditIcon />
              <br />
              <Typography>캠핑인포</Typography>
            </MenuButton>
          </a>
        </Link>
        <Link href={"/community"} passHref>
          <a>
            <MenuButton
              sx={{
                color: router.pathname.startsWith("/community")
                  ? "#5bbd6b"
                  : "#A7A7A7",
              }}
            >
              <SmsIcon />
              <br />
              <Typography>커뮤니티</Typography>
            </MenuButton>
          </a>
        </Link>
        <Link href={"/mypage"} passHref>
          <a>
            <MenuButton
              sx={{
                color: router.pathname.startsWith("/mypage")
                  ? "#5bbd6b"
                  : "#A7A7A7",
              }}
            >
              <PersonIcon />
              <br />
              <Typography>마이</Typography>
            </MenuButton>
          </a>
        </Link>
      </Toolbar>
    </Box>
  );
}
