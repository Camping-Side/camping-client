import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ProductSwiper } from "@cp/product/ProductSwiper";
import CustomLink from "@cp/common/CustomLink";
import styled from "@emotion/styled";
import { getList } from "../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { ReqDto } from "../../type/common/common";
import Box from "@mui/material/Box";
import productSlice from "@reducers/product";

type Props = {
  title: string;
  link: string;
};

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

export const ProductSwiperComponent = (props: Props) => {
  const dispatch = useDispatch();

  const stateProductList: Product[] = useSelector(
    (state: any) => state.product.productList
  );

  const getListDone: Product[] = useSelector(
    (state: any) => state.product.getListDone
  );

  const productReqData: ReqDto = useSelector(
    (state: any) => state.product.productReqData
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(getList(productReqData));
  }, []);

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(stateProductList);
  }, [getListDone]);

  return (
    <ProductSwiperGrid item container xs={12}>
      <Grid item xs={10} className="grid-product-swiper-title">
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={2} className="grid-product-swiper-text">
        <Typography>더보기</Typography>
        <Box onClick={(e) => alert("개발중입니다.")}>
          <ArrowForwardIosIcon />
        </Box>
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
