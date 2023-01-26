import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Grid from "@mui/material/Grid";

import ProductLike from "../../assets/img/temp/productLike.svg";
import ProductDislike from "../../assets/img/temp/productDislike.svg";
import { NumberCommaFilter } from "../../util/commonFilter";
import CustomLink from "@cp/common/CustomLink";

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

export const ProductSwiper = (props: any) => {
  return (
    <Swiper
      slidesPerView={2.8}
      spaceBetween={0}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {props.productList.map((product: any, index: number) => {
        return (
          <SwiperSlide key={index}>
            <CustomLink href={"/shop/product/" + index}>
              <ProductDescStyle>
                <Grid container>
                  <Grid item xs={12} mb={1.5}>
                    <ProductImageStyle>
                      <img className={"image"} src={product.img} />
                      {product.label && (
                        <div className={"label"}>{product.label}</div>
                      )}
                      {product.like && (
                        <img className={"like"} src={ProductLike.src} />
                      )}
                      {!product.like && (
                        <img className={"like"} src={ProductDislike.src} />
                      )}
                      {product.soldOut && (
                        <div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>
                      )}
                    </ProductImageStyle>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    mb={1.5}
                    sx={{ maxWidth: "92% !important" }}
                  >
                    {product.rank && (
                      <span className={"rank"}>{product.rank}</span>
                    )}
                    <span className={"name"}>{product.name}</span>
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
                    {product.desc}
                  </Grid>
                  <Grid item xs={12} sx={{ maxWidth: "92% !important" }}>
                    {product.dcRate > 0 && (
                      <span className={"dcRate"}>{product.dcRate}%</span>
                    )}
                    <span className={"price"}>
                      {NumberCommaFilter(product.price)}원
                    </span>
                  </Grid>
                </Grid>
              </ProductDescStyle>
            </CustomLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
