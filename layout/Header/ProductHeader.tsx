import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomLink from "@cp/common/CustomLink";

interface Props {
  category: string | string[] | undefined;
}

const HeaderBox = styled(Box)`
  background: white;
  width: 100%;
  svg {
    font-size: 30px;
  }
  a {
    cursor: pointer;
  }
  p {
    margin-left: 10px;
    font-size: 22px;
    font-weight: 700;
  }
  .div-home-icon {
    line-height: 23px;
    float: right;
  }
`;

export default function DrawerAppBar(props: Props) {
  const router = useRouter();

  const goBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <HeaderBox>
      <Toolbar>
        <Grid container>
          <Grid item xs={11} sx={{ display: "flex" }}>
            <a onClick={goBack}>
              <ArrowBackIcon />
            </a>
            <Typography>{props.category}</Typography>
          </Grid>
          {router.pathname.startsWith("/shop/product/") && (
            <Grid item xs={1}>
              <Box className="div-home-icon">
                <CustomLink href={"/"}>
                  <HomeOutlinedIcon />
                </CustomLink>
              </Box>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </HeaderBox>
  );
}
