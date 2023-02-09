import React, { FC, useState } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";
import Grid from "@mui/material/Grid";

//임시배너
import Banner from "../../assets/img/temp/banner.png";

import BoxImg from "../../assets/img/product/category/box.png";
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
import { Category } from "@cp/product/Category";
import CustomLink from "@cp/common/CustomLink";
import Box from "@mui/material/Box";

const ShopGrid = styled(Grid)`
  .grid-shop-padding {
    padding-left: 16px;
    padding-right: 16px;
  }
  .grid-shop-phrase-margin {
    margin-top: 24px;
  }
  .grid-shop-search-margin {
    margin-bottom: 32px;
  }
  .grid-shop-banner-margin {
    margin-top: 56px;
  }
  .phrase1 {
    font-size: 26px;
    font-weight: 400;
  }
  .phrase2 {
    font-size: 26px;
    font-weight: 700;
  }
  .grid-shop-more {
    display: flex;
    p {
      color: #919191;
      font-size: 15px;
      line-height: 3;
      font-weight: 700;
      margin-right: 4px;
      margin-left: 16px;
    }
    svg {
      color: #919191;
      font-size: 1.2rem;
      margin-top: 12px;
    }
  }
`;

const SearchBox = styled(Box)`
  position: relative;
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
    top: 29%;
    left: 92%;
  }
`;

const Shop: FC = () => {
  //temp bannerList
  const bannerList = [Banner, Banner, Banner, Banner];

  //temp categoryList
  const categoryList = [
    { name: "텐트", img: Tent.src },
    { name: "타프", img: Tarp.src },
    { name: "침낭", img: SleepingBag.src },
    { name: "테이블", img: Table.src },
    { name: "의자", img: Chair.src },
    { name: "매트", img: Mat.src },
    { name: "코펠", img: Coppell.src },
    { name: "화로", img: Fire.src },
    { name: "랜턴", img: Lantern.src },
    { name: "수납", img: BoxImg.src },
  ];

  const [keyword, setKeyword] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && keyword !== "") {
      console.log("keyword find");
    }
  };

  return (
    <Layout>
      <ShopGrid container>
        <Grid
          item
          xs={12}
          className={"grid-shop-phrase-margin grid-shop-padding"}
        >
          <Typography className={"phrase1"}>
            나상엽님, 좋은 아침이에요.
          </Typography>
        </Grid>
        <Grid item xs={10} className={"grid-shop-padding"}>
          <Typography className={"phrase2"}>어떤 장비를 찾으시나요?</Typography>
        </Grid>
        <Grid item xs={2} className={"grid-shop-more"}>
          <Typography>더보기</Typography>
          <CustomLink href={"/"}>
            <ArrowForwardIosIcon />
          </CustomLink>
        </Grid>
        <Grid
          item
          xs={12}
          className={"grid-shop-padding grid-shop-search-margin"}
        >
          <SearchBox>
            <input
              type={"text"}
              value={keyword}
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
              placeholder={"찾으시는 장비를 검색해보세요."}
            />
            <SearchIcon className={"searchIcon"} />
          </SearchBox>
        </Grid>
        <Grid item container xs={12}>
          <Category categoryList={categoryList} />
        </Grid>
        <Grid item xs={12} className={"grid-shop-banner-margin"}>
          <BannerSwiper bannerList={bannerList} />
        </Grid>
        <ProductSwiperComponent title={"주간베스트"} link={"/shop/top"} />
      </ShopGrid>
      <br />
    </Layout>
  );
};

export default Shop;
