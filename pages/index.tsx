import React, { FC } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";
import authSlice from "../reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "@cp/common/BaseButton";
import { getInfo } from "../actions/account";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//임시배너
import Banner from "../assets/img/temp/banner.png";

//임시상품
import Product1 from "../assets/img/temp/product1.png";
import Product2 from "../assets/img/temp/product2.png";

import ProductDislike from "../assets/img/temp/productDislike.svg";
import ProductLike from "../assets/img/temp/productLike.svg";

//swiper custom style
const BannerSwiperStyle = styled.div`
  .swiper {
    &-pagination-fraction {
      width: 10% !important;
      height: 33px;
      line-height: 33px;
      background-color: rgba(206, 205, 205, 0.9);
      margin-left: 85%;
      margin-bottom: 3%;
      color: #919191;
      border-radius: 25px;
      font-weight: 600 !important;
    }
    &-pagination-current {
      color: white;
    }
    &-button-next {
      padding: 10px;
      border-radius: 10px;
      background-color: rgba(232, 231, 230, 0.7);
      color: white;
      --swiper-navigation-size: 34px;
    }
    &-button-prev {
      padding: 10px 10px 10px 10px;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(232, 231, 230, 0.7);
      color: white;
      --swiper-navigation-size: 34px;
    }
  }
`;

const ProductImageStyle = styled.div`
  .image {
    border-radius: 18px;
  }
  .label {
    position: absolute;
    top: 4%;
    left: 8%;
    background-color: #5bbd6b;
    color: #ffffff;
    border-radius: 4px;
    font-size: 12px;
    height: 22px;
    width: 54px;
    line-height: 20px;
    text-align: center;
    font-weight: 800;
  }
  .like {
    position: absolute;
    top: 44%;
    left: 72%;
  }
  .soldOut {
    position: absolute;
    border-radius: 18px;
    top: 0%;
    left: 0%;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    .text {
      position: absolute;
      top: 44%;
      left: 42%;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

const ProductDescStyle = styled.div`
  .rank {
    font-size: 12pt;
    color: #424242;
    margin-right: 7px;
  }
  .name {
    font-size: 12pt;
    color: #919191;
  }
  .dcRate {
    font-size: 20pt;
    color: #fc6e51;
    margin-right: 15px;
  }
  .price {
    font-size: 20pt;
    color: #222222;
  }
`;

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

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <BannerSwiperStyle>
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={Banner.src} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Banner.src} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Banner.src} />
              </SwiperSlide>
            </Swiper>
          </BannerSwiperStyle>
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
            <Swiper
              slidesPerView={2.8}
              spaceBetween={0}
              freeMode={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductDescStyle>
                  <Grid container>
                    <Grid item xs={12} mb={1.5}>
                      <ProductImageStyle>
                        <img className={"image"} src={Product1.src} />
                        <div className={"label"}>무료배송</div>
                        <img className={"like"} src={ProductLike.src} />
                        <div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>
                      </ProductImageStyle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "92% !important" }}
                    >
                      <span className={"rank"}>01</span>
                      <span className={"name"}>HAUEL</span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{
                        color: "#383838",
                        maxWidth: "92% !important",
                        fontSize: 16,
                      }}
                    >
                      너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "92% !important" }}>
                      <span className={"dcRate"}>31%</span>
                      <span className={"price"}>46,800원</span>
                    </Grid>
                  </Grid>
                </ProductDescStyle>
              </SwiperSlide>
              <SwiperSlide>
                <ProductDescStyle>
                  <Grid container>
                    <Grid item xs={12} mb={1.5}>
                      <ProductImageStyle>
                        <img className={"image"} src={Product1.src} />
                        <div className={"label"}>무료배송</div>
                        <img className={"like"} src={ProductLike.src} />
                        {/*<div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>*/}
                      </ProductImageStyle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "92% !important" }}
                    >
                      <span className={"rank"}>02</span>
                      <span className={"name"}>HAUEL</span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{
                        color: "#383838",
                        maxWidth: "92% !important",
                        fontSize: 16,
                      }}
                    >
                      너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "92% !important" }}>
                      <span className={"dcRate"}>31%</span>
                      <span className={"price"}>46,800원</span>
                    </Grid>
                  </Grid>
                </ProductDescStyle>
              </SwiperSlide>
              <SwiperSlide>
                <ProductDescStyle>
                  <Grid container>
                    <Grid item xs={12} mb={1.5}>
                      <ProductImageStyle>
                        <img className={"image"} src={Product1.src} />
                        {/*<div className={"label"}>무료배송</div>*/}
                        <img className={"like"} src={ProductDislike.src} />
                        {/*<div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>*/}
                      </ProductImageStyle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "92% !important" }}
                    >
                      <span className={"rank"}>03</span>
                      <span className={"name"}>HAUEL</span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{
                        color: "#383838",
                        maxWidth: "92% !important",
                        fontSize: 16,
                      }}
                    >
                      너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "92% !important" }}>
                      <span className={"dcRate"}>31%</span>
                      <span className={"price"}>46,800원</span>
                    </Grid>
                  </Grid>
                </ProductDescStyle>
              </SwiperSlide>
              <SwiperSlide>
                <ProductDescStyle>
                  <Grid container>
                    <Grid item xs={12} mb={1.5}>
                      <ProductImageStyle>
                        <img className={"image"} src={Product1.src} />
                        <div className={"label"}>무료배송</div>
                        <img className={"like"} src={ProductDislike.src} />
                        <div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>
                      </ProductImageStyle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "92% !important" }}
                    >
                      <span className={"rank"}>04</span>
                      <span className={"name"}>HAUEL</span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{
                        color: "#383838",
                        maxWidth: "92% !important",
                        fontSize: 16,
                      }}
                    >
                      너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "92% !important" }}>
                      <span className={"dcRate"}>31%</span>
                      <span className={"price"}>46,800원</span>
                    </Grid>
                  </Grid>
                </ProductDescStyle>
              </SwiperSlide>
            </Swiper>
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
