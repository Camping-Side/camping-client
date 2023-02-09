import * as React from "react";
import Logo from "/assets/img/common/logo.png";
import Btn_search from "/assets/img/header/btn_search.png";
import Btn_cart from "/assets/img/header/btn_cart.png";
import Btn_like from "/assets/img/header/btn_like.png";
import CustomLink from "@cp/common/CustomLink";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const HeaderBox = styled(Box)`
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DrawerAppBar() {
  return (
    <HeaderBox>
      <Grid container>
        <Grid item xs={2.5}>
          <CustomLink href={"/"}>
            <img src={Logo.src} loading="lazy" />
          </CustomLink>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={1}>
          <Box onClick={(e) => alert("개발중입니다.")}>
            <img src={Btn_search.src} loading="lazy" />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box onClick={(e) => alert("개발중입니다.")}>
            <img src={Btn_like.src} loading="lazy" />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box onClick={(e) => alert("개발중입니다.")}>
            <img src={Btn_cart.src} loading="lazy" />
          </Box>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Grid>
    </HeaderBox>
  );
}
