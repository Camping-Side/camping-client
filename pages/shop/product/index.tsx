import React, { FC, useEffect, useState } from "react";
import ProductLayout from "@layout/ProductLayout";
import Grid from "@mui/material/Grid";

import styled from "@emotion/styled";
import ProductLike from "../../../assets/img/temp/productLike.svg";
import ProductDislike from "../../../assets/img/temp/productDislike.svg";
import { NumberCommaFilter } from "../../../util/commonFilter";
import { CategoryTab } from "@cp/product/CategoryTab";
import { useRouter } from "next/router";
import CustomLink from "@cp/common/CustomLink";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SelectChangeEvent } from "@mui/material/Select";
import { getList } from "../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { ReqDto } from "../../../type/common/common";
import productSlice from "@reducers/product";

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
    left: 5%;
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
  .grid-product-sort-margin {
    margin-bottom: 24px;
    text-align: center;
    .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
      padding: 0px 50px 0px 0px;

      font-weight: 400;
      font-size: 16px;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .grid-product-filter-margin {
    padding-left: 15px;
    text-align: center;
    margin-bottom: 40px;
    .MuiOutlinedInput-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary {
      border-radius: 25px !important;
      .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
        padding: 10px 30px 10px 20px;
        font-weight: 400;
        font-size: 16px;
        color: #919191;
      }
    }
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
  const dispatch = useDispatch();
  const router = useRouter();

  const query = router.query;

  const [selectedCategory, setSelectedCategory] = useState("");

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

  const stateProductList: Product[] = useSelector(
    (state: any) => state.product.productList
  );

  const getListDone: Boolean = useSelector(
    (state: any) => state.product.getListDone
  );

  const productReqData: any = {
    page: 0,
    size: 10,
    keyword: "",
    startDate: "",
    endDate: "",
    isList: false,
  };

  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = React.useState("");

  const handleChangeSort = (e: SelectChangeEvent) => {
    setSelectedSort(e.target.value);
    productReqData.isList = true;
    productReqData.sort = e.target.value;

    // @ts-ignore
    dispatch(getList(productReqData));
  };
  useEffect(() => {
    setSelectedCategory(categoryList[0]);
    productReqData.isList = true;
    // @ts-ignore
    dispatch(getList(productReqData));
  }, []);

  useEffect(() => {
    setProductList(stateProductList);
    if (getListDone) {
      dispatch(productSlice.actions.resetGetListDone());
    }
  }, [getListDone]);

  const handleClickLike = (selectedIndex: number) => {
    const mappedProductList = productList.map((m: Product, index: number) => {
      return {
        ...m,
        like: selectedIndex === index ? !m.like : m.like,
      };
    });
    setProductList(mappedProductList);
  };

  const [filter1, setFilter1] = React.useState("");
  const [filter2, setFilter2] = React.useState("");
  const [filter3, setFilter3] = React.useState("");

  const handleChangeFilter = (e: SelectChangeEvent, type: string) => {
    if (type === "filter1") {
      setFilter1(e.target.value);
    } else if (type === "filter2") {
      setFilter2(e.target.value);
    } else if (type === "filter3") {
      setFilter3(e.target.value);
    }
  };

  return (
    <ProductLayout category={query.category}>
      <CategoryTab
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductListInfoGrid container>
        <Grid item container xs={12} className={"grid-product-filter-margin"}>
          <Grid item xs={2}>
            <Select
              value={filter1}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter1");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터1</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              value={filter2}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter2");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터2</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              value={filter3}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter3");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터3</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={9} className={"grid-product-text-padding"}>
          <Typography>상품 {productList.length}개</Typography>
        </Grid>
        <Grid item xs={3} className={"grid-product-sort-margin"}>
          <Select
            value={selectedSort}
            onChange={handleChangeSort}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
          >
            <MenuItem value="">정렬</MenuItem>
            <MenuItem value={"1"}>가격낮은순</MenuItem>
            <MenuItem value={"2"}>가격높은순</MenuItem>
          </Select>
        </Grid>
        <Grid item container xs={12}>
          {productList.map((product: Product, index: number) => {
            return (
              <ProductInfoGrid item container xs={6} key={index}>
                <Grid item xs={12} className={"grid-product-img-margin"}>
                  <ProductImageStyle>
                    <CustomLink href={"/shop/product/" + index}>
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
                      <CustomLink href={"/shop/product/" + index}>
                        <div className={"sold-out"}>
                          <span className={"text"}>품절</span>
                        </div>
                      </CustomLink>
                    )}
                  </ProductImageStyle>
                </Grid>
                <CustomLink href={"/shop/product/" + index}>
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
