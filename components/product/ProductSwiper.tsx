import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Grid from "@mui/material/Grid";

import ProductLike from "../../assets/img/temp/productLike.svg";
import ProductDislike from "../../assets/img/temp/productDislike.svg";
import { NumberCommaFilter } from "../../util/filter";
import CustomLink from "@cp/common/CustomLink";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Product } from "../../type/product/product";
import productSlice from "@reducers/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useRouter } from "next/router";

const ProductImageBox = styled(Box)`
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
    cursor: pointer;
    position: absolute;
    top: 44%;
    left: 72%;
    z-index: 1;
  }
  .sold-out {
    position: absolute;
    border-radius: 18px;
    top: 0%;
    left: 0%;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    .sold-out-text {
      position: absolute;
      top: 44%;
      left: 42%;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

const ProductInfoGrid = styled(Grid)`
  .grid-product-width {
    max-width: 92% !important;
  }
  .grid-product-margin {
    margin-bottom: 12px;
  }
  .div-price {
    display: flex;
  }
  .name {
    color: #383838;
    font-size: 16px;
  }
  .rank {
    font-size: 12pt;
    color: #424242;
    margin-right: 7px;
  }
  .brand {
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

export const ProductSwiper = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleClickLike = (selectedIndex: number) => {
    if (!isLoggedIn && confirm("로그인이 필요합니다. 로그인하시겠습니까?")) {
      router.push("/user/login");
    }
    const mappedProductList = props.productList.map(
      (m: Product, index: number) => {
        return {
          ...m,
          like: selectedIndex === index ? !m.like : m.like,
        };
      }
    );
    dispatch(productSlice.actions.setProductList(mappedProductList));
  };

  return (
    <Swiper
      slidesPerView={2.8}
      spaceBetween={0}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {props.productList.map((product: Product, index: number) => {
        return (
          <SwiperSlide key={index}>
            <ProductInfoGrid container>
              <Grid item xs={12} className="grid-product-margin">
                <ProductImageBox>
                  <CustomLink href={"/shop/product/" + product.id}>
                    <img className={"image"} src={product.img[0]} />
                  </CustomLink>
                  {product.label && (
                    <div className={"label"}>{product.label}</div>
                  )}
                  {product.like && (
                    <img
                      className={"like"}
                      src={ProductLike.src}
                      onClick={() => {
                        handleClickLike(index);
                      }}
                    />
                  )}
                  {!product.like && (
                    <img
                      className={"like"}
                      src={ProductDislike.src}
                      onClick={() => {
                        handleClickLike(index);
                      }}
                    />
                  )}
                  {product.soldOut && (
                    <CustomLink href={"/shop/product/" + product.id}>
                      <div className={"sold-out"}>
                        <span className={"sold-out-text"}>품절</span>
                      </div>
                    </CustomLink>
                  )}
                </ProductImageBox>
              </Grid>
              <CustomLink href={"/shop/product/" + product.id}>
                <Grid
                  item
                  xs={12}
                  className="grid-product-width grid-product-margin"
                >
                  {product.rank && (
                    <span className={"rank"}>{product.rank}</span>
                  )}
                  <span className={"brand"}>{product.brand}</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="grid-product-width grid-product-margin"
                >
                  <Typography className="name">{product.name}</Typography>
                </Grid>
                <Grid item xs={12} className="grid-product-width">
                  <Box className="div-price">
                    {product.dcRate > 0 && (
                      <Box className="dcRate">{product.dcRate}%</Box>
                    )}
                    <Box className="price">
                      {NumberCommaFilter(product.price)}원
                    </Box>
                  </Box>
                </Grid>
              </CustomLink>
            </ProductInfoGrid>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
