import React, { FC } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";
import authSlice from "../reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "@cp/common/BaseButton";
import { getInfo } from "../actions/account";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//임시배너
import Banner from "../assets/img/temp/banner.png";

//임시상품
import Product1 from "../assets/img/temp/product1.png";

import { BannerSwiper } from "@cp/product/BannerSwiper";
import { ProductSwiper } from "@cp/product/ProductSwiper";

const App: FC = () => {
  const dispatch = useDispatch();

  const { loginDone } = useSelector((state: any) => state.auth);

  const logoutAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(authSlice.actions.logout());
  };

  const handleGetInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    dispatch(getInfo());
  };

  //temp bannerList
  const bannerList = [Banner, Banner, Banner, Banner];

  //temp product
  const product = {
    img: Product1.src,
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: 1,
    name: "HAEUL",
    desc: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
  };

  //temp productList
  const productList = [product, product, product, product];

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <BannerSwiper bannerList={bannerList} />
        </Grid>
        <Grid item container xs={12} sx={{ padding: 2 }}>
          <Grid item xs={9} mb={3}>
            <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
              캠퍼들의 워너비 Top 10
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{
                color: "#919191",
                fontSize: 15,
                lineHeight: 3,
                float: "right",
                fontWeight: "bold",
                marginRight: 0.8,
              }}
            >
              더보기
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <ArrowForwardIosIcon
              sx={{ color: "#919191", fontSize: "1.2rem", marginTop: 1.5 }}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductSwiper productList={productList} />
          </Grid>
        </Grid>
      </Grid>
      <Link href="/sample">샘플바로가기</Link>
      <br />
      {!loginDone && <Link href="/user/login">로그인 바로가기</Link>}
      {loginDone && (
        <BaseButton variant="contained" size="large" onClick={logoutAction}>
          로그아웃
        </BaseButton>
      )}
      {loginDone && (
        <BaseButton variant="contained" size="large" onClick={handleGetInfo}>
          내정보
        </BaseButton>
      )}
    </Layout>
  );
};

export default App;
