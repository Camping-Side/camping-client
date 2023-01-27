import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ProductSwiper } from "@cp/product/ProductSwiper";
import Product1 from "../../assets/img/temp/product1.png";
import CustomLink from "@cp/common/CustomLink";
import styled from "@emotion/styled";

type Product = {
  img: string[];
  label: string;
  like: boolean;
  soldOut: boolean;
  rank: number;
  brand: string;
  name: string;
  dcRate: number;
  price: number;
  category: string;
};

const ProductSwiperGrid = styled(Grid)`
  padding: 16px;
  .grid-product-swiper-title {
    margin-bottom: 24px;
    p {
      font-size: 26px;
      font-weight: 600;
    }
  }
  .grid-product-swiper-text {
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

export const ProductSwiperComponent = (props: any) => {
  //temp product
  const product = {
    img: [Product1.src],
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: 1,
    brand: "HAEUL",
    name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "터널",
  };
  const product2 = {
    img: [Product1.src],
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: 1,
    brand: "HAEUL",
    name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "원터치",
  };

  //temp productList
  const result: Product[] = [product, product2, product, product];

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(result);
  }, []);

  return (
    <ProductSwiperGrid item container xs={12}>
      <Grid item xs={10} className="grid-product-swiper-title">
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={2} className="grid-product-swiper-text">
        <Typography>더보기</Typography>
        <CustomLink href={props.link}>
          <ArrowForwardIosIcon />
        </CustomLink>
      </Grid>
      <Grid item xs={12}>
        <ProductSwiper
          productList={productList}
          setProductList={setProductList}
        />
      </Grid>
    </ProductSwiperGrid>
  );
};
