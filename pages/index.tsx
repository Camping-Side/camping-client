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
import { ProductSwiperComponent } from "@cp/product/ProductSwiperComponent";

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

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <BannerSwiper bannerList={bannerList} />
        </Grid>
        <ProductSwiperComponent
          title={"캠퍼들의 워너비 Top 10"}
          link={"/shop/top"}
        />
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
