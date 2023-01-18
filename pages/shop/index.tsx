import React, { FC } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";
import authSlice from "../../reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "@cp/common/BaseButton";
import { getInfo } from "../../actions/account";
import Grid from "@mui/material/Grid";

//임시배너
import Banner from "../../assets/img/temp/banner.png";

import Box from "../../assets/img/product/category/box.png";
import Chair from "../../assets/img/product/category/chair.png";
import Coppell from "../../assets/img/product/category/coppell.png";
import Fire from "../../assets/img/product/category/fire.png";
import Lantern from "../../assets/img/product/category/lantern.png";
import Mat from "../../assets/img/product/category/mat.png";
import SleepingBag from "../../assets/img/product/category/sleepingBag.png";
import Table from "../../assets/img/product/category/table.png";
import Tarp from "../../assets/img/product/category/tarp.png";
import Tent from "../../assets/img/product/category/tent.png";

//임시상품
import { BannerSwiper } from "@cp/product/BannerSwiper";
import { ProductSwiperComponent } from "@cp/product/ProductSwiperComponent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
const SearchInput = styled.div`
  input {
    border: none;
    background-color: #f8f8f8;
    width: 95%;
    height: 56px;
    border-radius: 40px;
    padding-left: 4%;
    ::placeholder {
      color: #a7a7a7;
      font-size: 16px;
      font-weight: 400;
    }
    :focus {
      outline: none;
    }
  }
  .searchIcon {
    position: absolute;
    top: 16%;
    left: 75.5%;
  }
`;

const Shop: FC = () => {
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
        <Grid item xs={12} mt={3} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Typography sx={{ fontSize: "26px", fontWeight: "400" }}>
            나상엽님, 좋은 아침이에요.
          </Typography>
        </Grid>
        <Grid item xs={10} mb={3} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
            어떤 장비를 찾으시나요?
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex" }}>
          <Typography
            sx={{
              color: "#919191",
              fontSize: 15,
              lineHeight: 3,
              fontWeight: "bold",
              marginRight: 0.5,
              marginLeft: 2,
            }}
          >
            더보기
          </Typography>
          <Link href={"/"} passHref>
            <a>
              <ArrowForwardIosIcon
                sx={{ color: "#919191", fontSize: "1.2rem", marginTop: 1.5 }}
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} mb={4} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <SearchInput>
            <input
              type={"text"}
              value={""}
              placeholder={"찾으시는 장비를 검색해보세요."}
            />
            <SearchIcon className={"searchIcon"} />
          </SearchInput>
        </Grid>
        <Grid item container xs={12} sx={{ textAlign: "center" }}>
          <Grid item xs={2.4}>
            <img src={Tent.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              텐트
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Tarp.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              타프
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={SleepingBag.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              침낭
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Table.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              테이블
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Chair.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              체어
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{ textAlign: "center" }}>
          <Grid item xs={2.4}>
            <img src={Mat.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              매트
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Coppell.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              코펠
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Fire.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              화로대
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Lantern.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              랜턴
            </Typography>
          </Grid>
          <Grid item xs={2.4}>
            <img src={Box.src} />
            <br />
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              수납
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={7}>
          <BannerSwiper bannerList={bannerList} />
        </Grid>
        <ProductSwiperComponent title={"주간베스트"} link={"/shop/top"} />
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

export default Shop;
