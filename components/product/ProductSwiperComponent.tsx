import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ProductSwiper } from "@cp/product/ProductSwiper";
import Product1 from "../../assets/img/temp/product1.png";
import Link from "next/link";
import CustomLink from "@cp/common/CustomLink";

export const ProductSwiperComponent = (props: any) => {
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
    <Grid item container xs={12} sx={{ padding: 2 }}>
      <Grid item xs={10} mb={3}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
          {props.title}
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
        <CustomLink href={props.link}>
          <ArrowForwardIosIcon
            sx={{ color: "#919191", fontSize: "1.2rem", marginTop: 1.5 }}
          />
        </CustomLink>
      </Grid>

      <Grid item xs={12}>
        <ProductSwiper productList={productList} />
      </Grid>
    </Grid>
  );
};
