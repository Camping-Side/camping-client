import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NumberCommaFilter } from "../../../util/commonFilter";
import { Divider } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProductDetailLayout from "@layout/ProductDetailLayout";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../../actions/product";
import productSlice from "@reducers/product";
import { AppDispatch } from "../../../store/configureStore";
import { Product, SubImage } from "../../../type/product/product";

//styled-component
import {
  InfoGrid,
  TitleGrid,
  DescGrid,
  SubImageBox,
  PurchaseTabGrid,
} from "../../../assets/styles/styled/product/productDetail";

const ProductDetailComponent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const { id } = router.query;

  const productDetail: Product = useSelector(
    (state: any) => state.product.productDetail
  );
  const selectedImg: string = useSelector(
    (state: any) => state.product.selectedImg
  );
  const imgList: SubImage[] = useSelector(
    (state: any) => state.product.imgList
  );

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const handleClickImage = (selectedIndex: number) => {
    if (imgList[selectedIndex].isSelected) {
      return;
    }

    const mappedImgList = imgList.map((img: SubImage, index: number) => {
      return {
        ...img,
        isSelected: index === selectedIndex ? true : false,
      };
    });

    const filteredImgList = mappedImgList.filter((f) => {
      return f.isSelected;
    });

    dispatch(productSlice.actions.setSelectedImg(filteredImgList[0].url));
    dispatch(productSlice.actions.setImgList(mappedImgList));
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClickCart = () => {};

  return (
    <ProductDetailLayout>
      <InfoGrid container>
        <Grid item xs={12}>
          <Box>
            <img src={selectedImg} />
          </Box>
        </Grid>
        <Grid className="sub-image-grid" item xs={12}>
          <SubImageBox>
            {imgList.map((img: SubImage, index: number) => {
              return (
                <Box key={index}>
                  <img
                    className={img.isSelected ? "selected" : ""}
                    src={img.url}
                    onClick={(
                      e: React.MouseEvent<HTMLImageElement, MouseEvent>
                    ) => {
                      handleClickImage(index);
                    }}
                  />
                </Box>
              );
            })}
          </SubImageBox>
        </Grid>
        <TitleGrid container>
          <Grid className="brand" item xs={12}>
            <Typography>{productDetail.brand}</Typography>
          </Grid>
          <Grid className="name" item xs={11}>
            <Typography>{productDetail.name}</Typography>
          </Grid>
          <Grid className="grid-icon" item xs={1}>
            <ShareIcon />
          </Grid>
          <Grid container item xs={12}>
            <Box className="dc-rate">{productDetail.dcRate}%</Box>
            <Box className="price">
              {NumberCommaFilter(productDetail.price)}원
            </Box>
            <Box className="origin-price">
              {NumberCommaFilter(productDetail.originPrice)}원
            </Box>
          </Grid>
        </TitleGrid>
      </InfoGrid>
      <Divider sx={{ borderWidth: "4px" }} />
      <DescGrid container>
        <Grid className="grid-desc-title" item xs={12}>
          <Typography>상품설명</Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={productDetail.desc} />
        </Grid>
      </DescGrid>
      <PurchaseTabGrid container>
        <Grid item xs={1.5}>
          <Box className="div-purchase-favorite-icon">
            {!isFavorite && (
              <FavoriteBorderIcon onClick={handleClickFavorite} />
            )}
            {isFavorite && <FavoriteIcon onClick={handleClickFavorite} />}
          </Box>
        </Grid>
        <Grid className="grid-purchase-divider" item xs={1}>
          <Box className="divider left-divider"></Box>
        </Grid>
        <Grid className="purchase-text" item xs={7}>
          <Box className="div-purchase-text">구매하기</Box>
        </Grid>
        <Grid className="grid-purchase-divider" item xs={1}>
          <Box className="divider right-divider"></Box>
        </Grid>
        <Grid item xs={1.5}>
          <Box className="div-purchase-cart-icon">
            <ShoppingBagOutlinedIcon onClick={handleClickCart} />
          </Box>
        </Grid>
      </PurchaseTabGrid>
    </ProductDetailLayout>
  );
};

export default ProductDetailComponent;
