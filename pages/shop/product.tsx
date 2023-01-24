import React, { FC, useEffect, useState } from "react";
import ProductLayout from "@layout/ProductLayout";
import Grid from "@mui/material/Grid";
//임시배너
import ProductList1 from "../../assets/img/temp/productList1.png";

import ProductList2 from "../../assets/img/temp/productList2.png";
//임시상품
import styled from "@emotion/styled";
import ProductLike from "../../assets/img/temp/productLike.svg";
import ProductDislike from "../../assets/img/temp/productDislike.svg";
import { numberCommaFilter } from "../../util/commonFilter";
import { CategoryTab } from "@cp/product/CategoryTab";
import { useRouter } from "next/router";

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

type Product = {
  img: string;
  label: string;
  like: boolean;
  soldOut: boolean;
  rank: string;
  name: string;
  desc: string;
  dcRate: number;
  price: number;
  category: string;
};

const Product: FC = () => {
  const router = useRouter();

  const query = router.query;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);

  //temp categoryList
  const categoryList = [
    "원터치 텐트",
    "돔 텐트",
    "리빙쉘 텐트",
    "터널 텐트",
    "차박 텐트",
    "하울",
    "원터치 텐트",
    "돔 텐트",
    "리빙쉘 텐트",
    "터널 텐트",
    "차박 텐트",
    "하울",
  ];

  useEffect(() => {
    setSelectedCategory(categoryList[0]);
  }, []);

  //temp product
  const product1 = {
    img: ProductList1.src,
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: "",
    name: "HAEUL원터치",
    desc: "1너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "원터치",
  };
  const product2 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: "",
    name: "HAEUL돔",
    desc: "2너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "돔",
  };
  const product3 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: "",
    name: "HAEUL리빙쉘",
    desc: "3너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "리빙쉘",
  };
  const product4 = {
    img: ProductList2.src,
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: "",
    name: "HAEUL터널",
    desc: "4너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "터널",
  };

  //temp productList
  const result: Product[] = [
    product1,
    product2,
    product3,
    product4,
    product1,
    product2,
    product3,
    product4,
    product1,
    product2,
    product3,
    product4,
    product1,
    product2,
    product3,
    product4,
  ];

  useEffect(() => {
    setProductList(result);
  }, [selectedCategory]);

  return (
    <ProductLayout category={query.category}>
      <CategoryTab
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
      />
      <Grid container>
        <Grid item xs={10} sx={{ paddingLeft: 3 }}>
          상품 {productList.length}개
        </Grid>
        <Grid item xs={2} mb={3}>
          인기순
        </Grid>
        <Grid item container xs={12}>
          {productList.map((product: any, index: number) => {
            return (
              <Grid item container xs={6} key={index}>
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
                    <span className={"name"}>
                      {index}
                      {product.name}
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
            );
          })}
        </Grid>
      </Grid>
    </ProductLayout>
  );
};

export default Product;
