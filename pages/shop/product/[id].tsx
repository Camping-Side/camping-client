import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";
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
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../store/configureStore";
import communitySlice from "@reducers/community";

const InfoGrid = styled(Grid)`
  .sub-image-grid {
    margin-top: 15px;
  }
`;

const TitleGrid = styled(Grid)`
  margin-top: 5px;
  padding: 20px;
  .grid-icon {
    text-align: center;
    cursor: pointer;
    line-height: 44px;
  }
  .brand {
    font-weight: 700;
    font-size: 16px;
    color: #919191;
  }
  .name {
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: #222222;
  }
  .dc-rate {
    font-weight: 700;
    font-size: 26px;
    color: #fc6e51;
    margin-right: 16px;
  }
  .price {
    font-weight: 700;
    font-size: 26px;
    color: #222222;
    margin-right: 8px;
  }
  .origin-price {
    font-weight: 400;
    font-size: 20px;
    line-height: 42px;
    text-decoration-line: line-through;
    color: #919191;
  }
`;

const DescGrid = styled(Grid)`
  padding: 20px;
  p {
    font-weight: 700;
    font-size: 22px;
    color: #222222;
  }
  .grid-desc-title {
    margin-bottom: 16px;
  }
`;

const SubImageBox = styled(Box)`
  display: flex;
  margin-left: 18px;
  div {
    position: relative;
    padding: 3.2px;
  }
  img {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.4;
  }
  .selected {
    outline: 2px solid #5bbd6b;
    outline-offset: -2px;
    opacity: 1;
  }
`;

const PurchaseTabGrid = styled(Grid)`
  position: fixed;
  bottom: 0;
  width: 640px;
  height: 60px;
  margin: 0 auto;
  background-color: #fc6e51;
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
  color: white;
  text-align: center;
  .div-purchase-favorite-icon {
    line-height: 81px;
    svg {
      cursor: pointer;
      font-size: 2rem;
    }
  }
  .div-purchase-cart-icon {
    line-height: 77px;
    svg {
      cursor: pointer;
      font-size: 2rem;
    }
  }
  .div-purchase-text {
    font-weight: 700;
    font-size: 20px;
    line-height: 61px;
    cursor: pointer;
  }
  .grid-purchase-divider {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .divider {
      width: 17px;
      height: 17px;
    }
    .right-divider {
      border-right: 1px solid white;
    }
    .left-divider {
      border-left: 1px solid white;
    }
  }
`;

type Product = {
  id: number;
  img: [];
  label: string;
  like: boolean;
  soldOut: boolean;
  rank: number;
  brand: string;
  name: string;
  dcRate: number;
  price: number;
  category: string;
  detailImg: string[];
  desc: string;
  originPrice: number;
};

type SubImage = {
  url: string;
  isSelected: boolean;
};

const ProductDetailComponent: FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const dispatch = useDispatch<AppDispatch>();

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
