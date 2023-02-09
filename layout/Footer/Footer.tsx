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
import Grid from "@mui/material/Grid";
import CustomLink from "@cp/common/CustomLink";

const FooterBox = styled(Box)`
  position: fixed;
  bottom: 0;
  width: 640px;
  height: 58px;
  margin: 0 auto;
  border-top: 2px solid #e9e9e9;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .selected {
    color: #5bbd6b;
  }
  .un-selected {
    color: #a7a7a7;
  }
`;

export default function BottomAppBar() {
  const router = useRouter();

  const getPathIconClassName = (path: string) => {
    return router.pathname === path ? "selected" : "un-selected";
  };

  return (
    <FooterBox>
      <Grid container>
        <Grid item xs={2.4}>
          <CustomLink href={"/"}>
            <Box className={getPathIconClassName("/")}>
              <HomeIcon />
              <br />
              <Typography>홈</Typography>
            </Box>
          </CustomLink>
        </Grid>
        <Grid item xs={2.4}>
          <CustomLink href={"/shop"}>
            <Box className={getPathIconClassName("/shop")}>
              <ShoppingCartIcon />
              <br />
              <Typography>상점</Typography>
            </Box>
          </CustomLink>
        </Grid>
        <Grid item xs={2.4}>
          <Box onClick={(e) => alert("개발중입니다.")}>
            <Box className={getPathIconClassName("/camping")}>
              <EditIcon />
              <br />
              <Typography>캠핑인포</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2.4}>
          <Box onClick={(e) => alert("개발중입니다.")}>
            <Box className={getPathIconClassName("/community")}>
              <SmsIcon />
              <br />
              <Typography>커뮤니티</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2.4}>
          <CustomLink href={"/user/login"}>
            <Box className={getPathIconClassName("/my")}>
              <PersonIcon />
              <br />
              <Typography>마이</Typography>
            </Box>
          </CustomLink>
        </Grid>
      </Grid>
    </FooterBox>
  );
}
