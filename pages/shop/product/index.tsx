import React, { FC, useEffect, useState } from "react";
import ProductLayout from "@layout/ProductLayout";
import Grid from "@mui/material/Grid";
//임시배너
import ProductList1 from "../../../assets/img/temp/productList1.png";

import ProductList2 from "../../../assets/img/temp/productList2.png";
//임시상품
import styled from "@emotion/styled";
import ProductLike from "../../../assets/img/temp/productLike.svg";
import ProductDislike from "../../../assets/img/temp/productDislike.svg";
import { NumberCommaFilter } from "../../../util/commonFilter";
import { CategoryTab } from "@cp/product/CategoryTab";
import { useRouter } from "next/router";
import CustomLink from "@cp/common/CustomLink";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
    cursor: pointer;
    position: absolute;
    top: 82%;
    left: 79%;
    z-index: 1;
  }
  .sold-out {
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

const ProductListInfoGrid = styled(Grid)`
  .grid-product-text-padding {
    padding-left: 24px;
    p {
      font-weight: 400;
      font-size: 16px;
    }
  }
  .grid-product-select-margin {
    margin-bottom: 24px;
  }
  select {
    border: none;
    font-weight: 400;
    font-size: 16px;
  }
`;

const ProductInfoGrid = styled(Grid)`
  .grid-product-img-margin {
    margin-bottom: 12px;
  }
  .div-product-desc {
    margin-left: 17px;
    margin-bottom: 30px;
    div {
      max-width: 95% !important;
    }
    .grid-product-brand {
      margin-bottom: 12px;
      .rank {
        font-size: 12pt;
        color: #424242;
        margin-right: 7px;
      }
      .brand {
        font-size: 12pt;
        color: #919191;
      }
    }
    .grid-product-name {
      margin-bottom: 12px;
      p {
        color: #383838;
        fontsize: 16px;
      }
    }
    .grid-product-price {
      display: flex;
      margin-bottom: 12px;
      .dcRate {
        font-size: 20pt;
        color: #fc6e51;
        margin-right: 15px;
      }
      .price {
        font-size: 20pt;
        color: #222222;
      }
    }
  }
`;

type Product = {
  img: string[];
  label: string;
  like: boolean;
  soldOut: boolean;
  rank: number | null;
  brand: string;
  name: string;
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
    img: [ProductList1.src],
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: null,
    brand: "HAEUL원터치",
    name: "1너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "원터치",
  };
  const product2 = {
    img: [ProductList2.src],
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: null,
    brand: "HAEUL돔",
    name: "2너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "돔",
  };
  const product3 = {
    img: [ProductList2.src],
    label: "무료배송",
    like: true,
    soldOut: true,
    rank: null,
    brand: "HAEUL리빙쉘",
    name: "3너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
    dcRate: 31,
    price: 46800,
    category: "리빙쉘",
  };
  const product4 = {
    img: [ProductList2.src],
    label: "무료배송",
    like: true,
    soldOut: false,
    rank: null,
    brand: "HAEUL터널",
    name: "4너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
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

  const handleClickLike = (selectedIndex: number) => {
    const list = productList.map((m: Product, index: number) => {
      return {
        ...m,
        like: selectedIndex === index ? !m.like : m.like,
      };
    });
    setProductList(list);
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <ProductLayout category={query.category}>
      <CategoryTab
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductListInfoGrid container>
        <Grid item xs={9.5} className={"grid-product-text-padding"}>
          <Typography>상품 {productList.length}개</Typography>
        </Grid>
        <Grid item xs={2.5} className={"grid-product-select-margin"}>
          <select onChange={handleChangeSort}>
            <option value="1">인기순</option>
            <option value="2">최신순</option>
            <option value="3">가격낮은순</option>
            <option value="4">가격높은순</option>
          </select>
        </Grid>
        <Grid item container xs={12}>
          {productList.map((product: any, index: number) => {
            return (
              <ProductInfoGrid item container xs={6}>
                <Grid item xs={12} className={"grid-product-img-margin"}>
                  <ProductImageStyle>
                    <CustomLink href={"/shop/product/" + index} key={index}>
                      <img className={"image"} src={product.img} />
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
                      <div className={"sold-out"}>
                        <span className={"text"}>품절</span>
                      </div>
                    )}
                  </ProductImageStyle>
                </Grid>
                <CustomLink href={"/shop/product/" + index} key={index}>
                  <Box className={"div-product-desc"}>
                    <Grid item xs={12} className={"grid-product-brand"}>
                      {product.rank && (
                        <Typography className={"rank"}>
                          {product.rank}
                        </Typography>
                      )}
                      <Typography className={"brand"}>
                        {product.brand}
                      </Typography>
                    </Grid>
                    <Grid className={"grid-product-name"} item xs={12}>
                      <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={12} className={"grid-product-price"}>
                      {product.dcRate > 0 && (
                        <Typography className={"dcRate"}>
                          {product.dcRate}%
                        </Typography>
                      )}
                      <Typography className={"price"}>
                        {NumberCommaFilter(product.price)}원
                      </Typography>
                    </Grid>
                  </Box>
                </CustomLink>
              </ProductInfoGrid>
            );
          })}
        </Grid>
      </ProductListInfoGrid>
    </ProductLayout>
  );
};

export default Product;
