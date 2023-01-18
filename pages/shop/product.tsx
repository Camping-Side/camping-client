import React, { FC } from "react";

import Layout from "@layout/Layout";
import Grid from "@mui/material/Grid";

//임시배너
import ProductList1 from "../../assets/img/temp/productList1.png";
import ProductList2 from "../../assets/img/temp/productList2.png";

//임시상품
import styled from "@emotion/styled";
import ProductLike from "../../assets/img/temp/productLike.svg";
import ProductDislike from "../../assets/img/temp/productDislike.svg";
import { numberCommaFilter } from "../../util/commonFilter";

const ProductImageStyle = styled.div`
  text-align: center;
  position: relative;
  .image {
    border-radius: 18px;
  }
  .label {
    position: absolute;
    top: 6%;
    left: 11%;
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
    top: 82%;
    left: 79%;
    z-index: 1;
  }
  .soldOut {
    position: absolute;
    border-radius: 18px;
    top: 0%;
    left: 5.5%;
    width: 289px;
    height: 289px;
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
  margin-left: 17px;
  margin-bottom: 30px;
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

const Product: FC = () => {
  //temp product
  const product1 = {
    img: ProductList1.src,
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: 0,
    name: "HAEUL",
    desc: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
  };
  const product2 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: "",
    name: "HAEUL",
    desc: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
  };
  const product3 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: "",
    name: "HAEUL",
    desc: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
  };
  const product4 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: "",
    name: "HAEUL",
    desc: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
  };

  //temp productList
  const productList = [
    product1,
    product2,
    product3,
    product4,
    product1,
    product2,
    product3,
    product4,
  ];
  return (
    <Layout>
      <Grid container>
        {productList.map((product: any, index: number) => {
          if (index % 2 === 0) {
            return (
              <>
                <Grid item container xs={6}>
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
                  <ProductDescStyle>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "95% !important" }}
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
                        maxWidth: "95% !important",
                        fontSize: 16,
                      }}
                    >
                      {product.desc}
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "95% !important" }}>
                      {product.dcRate > 0 && (
                        <span className={"dcRate"}>{product.dcRate}%</span>
                      )}
                      <span className={"price"}>
                        {numberCommaFilter(product.price)}원
                      </span>
                    </Grid>
                  </ProductDescStyle>
                </Grid>
                <Grid item container xs={6}>
                  <Grid item xs={12} mb={1.5}>
                    <ProductImageStyle>
                      <img
                        className={"image"}
                        src={productList[index + 1].img}
                      />
                      {productList[index + 1].label && (
                        <div className={"label"}>
                          {productList[index + 1].label}
                        </div>
                      )}
                      {productList[index + 1].like && (
                        <img className={"like"} src={ProductLike.src} />
                      )}
                      {!productList[index + 1].like && (
                        <img className={"like"} src={ProductDislike.src} />
                      )}
                      {productList[index + 1].soldOut && (
                        <div className={"soldOut"}>
                          <span className={"text"}>품절</span>
                        </div>
                      )}
                    </ProductImageStyle>
                  </Grid>
                  <ProductDescStyle>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{ maxWidth: "95% !important" }}
                    >
                      {productList[index + 1].rank &&
                        productList[index + 1].rank > 0 && (
                          <span className={"rank"}>
                            {productList[index + 1].rank}
                          </span>
                        )}
                      <span className={"name"}>
                        {productList[index + 1].name}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      mb={1.5}
                      sx={{
                        color: "#383838",
                        maxWidth: "95% !important",
                        fontSize: 16,
                      }}
                    >
                      {productList[index + 1].desc}
                    </Grid>
                    <Grid item xs={12} sx={{ maxWidth: "95% !important" }}>
                      {productList[index + 1].dcRate > 0 && (
                        <span className={"dcRate"}>
                          {productList[index + 1].dcRate}%
                        </span>
                      )}
                      <span className={"price"}>
                        {numberCommaFilter(productList[index + 1].price)}원
                      </span>
                    </Grid>
                  </ProductDescStyle>
                </Grid>
              </>
            );
          }
        })}
      </Grid>
    </Layout>
  );
};

export default Product;
