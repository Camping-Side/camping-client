import React, { useEffect } from "react";

import Layout from "@layout/Layout";
import authSlice from "../reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { BannerSwiper } from "@cp/product/BannerSwiper";
import { ProductSwiperComponent } from "@cp/product/ProductSwiperComponent";
import wrapper, { AppDispatch } from "../store/configureStore";
import { Category, Product, ProductReqData } from "../type/product/product";
import { GetServerSideProps } from "next";
import productSlice from "@reducers/product";
import axios from "axios";
import bannerSlice from "@reducers/banner";
import Head from "next/head";

type Props = {
  bannerList: string[];
  productList: Product[];
  tag: string;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const productReqData: ProductReqData = {
      page: 0,
      size: 10,
      keyword: "",
      startDate: "",
      endDate: "",
      isList: false,
      sort: "",
      category: 0,
    };

    const getProductList = async (productReqData: ProductReqData) => {
      return new Promise((resolve, reject) => {
        axios
          .get(BASE_URL + "/api/v1/product", {
            params: productReqData,
          })
          .then((res) => {
            resolve(res.data);
          });
      });
    };

    const getBannerList = async () => {
      return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/api/v1/banner").then((res) => {
          resolve(res.data);
        });
      });
    };

    const [productList, bannerList] = await Promise.all([
      getProductList(productReqData),
      getBannerList(),
    ]);

    store.dispatch(productSlice.actions.setProductList(productList));
    store.dispatch(bannerSlice.actions.setBannerList(bannerList));

    // @ts-ignore
    const brandTagList = productList.map((m: Product) => {
      return m.brand;
    });
    const brandTag = brandTagList.toString();
    return {
      props: {
        bannerList: bannerList,
        tag: brandTag,
      },
    };
  });

const Main = (props: Props) => {
  const productList: Product[] = useSelector(
    (state: any) => state.product.productList
  );

  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="camporest 캠핑용품 커머스와 캠핑 커뮤니티가 하나로, 용품구매와 정보공유를 한 곳에서"
        />
        <meta name="keywords" content={props.tag} />
      </Head>
      <Grid container>
        <Grid item xs={12}>
          <BannerSwiper bannerList={props.bannerList} />
        </Grid>
        <ProductSwiperComponent
          title={"캠퍼들의 워너비 Top 10"}
          link={"/shop/top"}
          productList={productList}
        />
      </Grid>
      <br />
    </Layout>
  );
};

export default Main;
