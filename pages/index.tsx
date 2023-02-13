import React, { FC, useEffect } from "react";

import Layout from "@layout/Layout";
import authSlice from "../reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { BannerSwiper } from "@cp/product/BannerSwiper";
import { ProductSwiperComponent } from "@cp/product/ProductSwiperComponent";
import { getList as getBannerList } from "../actions/banner";
import { getList as getProductList } from "../actions/product";
import { AppDispatch } from "../store/configureStore";
import { Product, ProductReqData } from "../type/product/product";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const bannerList: string[] = useSelector(
    (state: any) => state.banner.bannerList
  );
  const productList: Product[] = useSelector(
    (state: any) => state.product.productList
  );

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

  useEffect(() => {
    dispatch(getBannerList());
    dispatch(getProductList(productReqData));
  }, []);

  const logoutAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(authSlice.actions.logout());
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <BannerSwiper bannerList={bannerList} />
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

export default App;
