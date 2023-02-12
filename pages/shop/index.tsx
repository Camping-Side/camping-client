import React, { FC, useEffect, useState } from "react";

import Layout from "@layout/Layout";
import Grid from "@mui/material/Grid";

//임시배너
import Banner from "../../assets/img/temp/banner.png";

import { BannerSwiper } from "@cp/product/BannerSwiper";
import { ProductSwiperComponent } from "@cp/product/ProductSwiperComponent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import CustomLink from "@cp/common/CustomLink";
import { getCategoryList } from "../../actions/shop";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { Category } from "../../type/shop/shop";

//styled-component
import { SearchBox, ShopGrid } from "../../assets/styles/styled/shop/shop";
import { CategoryComponent } from "@cp/product/CategoryComponent";

const Shop: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryList: Category[] = useSelector(
    (state: any) => state.shop.categoryList
  );

  //temp bannerList
  const bannerList = [Banner, Banner, Banner, Banner];

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

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
          <CategoryComponent categoryList={categoryList} />
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
