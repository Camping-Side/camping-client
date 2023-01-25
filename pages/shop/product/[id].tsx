import React, { FC, useEffect, useState } from "react";
import ProductLayout from "@layout/ProductLayout";
import Grid from "@mui/material/Grid";

import { useRouter } from "next/router";
import ProductDetail from "../../../assets/img/temp/product_detail.png";
import ProductDetail2 from "../../../assets/img/temp/product_detail2.png";
import ProductDetail3 from "../../../assets/img/temp/product_detail3.png";
import ProductDetail4 from "../../../assets/img/temp/product_detail4.png";
import ProductDetail5 from "../../../assets/img/temp/product_detail5.png";
import ProductDetail6 from "../../../assets/img/temp/product_detail6.png";
import ProductDetail7 from "../../../assets/img/temp/product_detail7.png";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const MainGrid = styled(Grid)`
  .sub-image-grid {
    margin-top: 15px;
  }
`;

const SubImageBox = styled(Box)`
  display: flex;
  margin-left: 18px;
  div {
    padding: 3.2px;
  }
  img {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 8px;
    cursor: pointer;
  }
  .selected {
    outline: 2px solid #5bbd6b;
    outline-offset: -2px;
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

type SubImage = {
  url: string;
  isSelected: boolean;
};

const Product: FC = () => {
  const router = useRouter();

  const { id } = router.query;

  //temp product
  const product = {
    img: [
      ProductDetail.src,
      ProductDetail2.src,
      ProductDetail3.src,
      ProductDetail4.src,
      ProductDetail5.src,
      ProductDetail6.src,
      ProductDetail7.src,
    ],
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

  const [imgList, setImgList] = useState<SubImage[]>([]);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    setImgList(
      product.img.map((img: string, index: number) => {
        return {
          url: img,
          isSelected: index === 0 ? true : false,
        };
      })
    );
    setSelectedImg(product.img[0]);
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

    setImgList(mappedImgList);
    setSelectedImg(filteredImgList[0].url);
  };

  return (
    <ProductLayout>
      <MainGrid container>
        <Grid item container xs={12}>
          <Box>
            <img src={selectedImg} />
          </Box>
        </Grid>
        <Grid className="sub-image-grid" item container xs={12}>
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
                  {index}
                </Box>
              );
            })}
          </SubImageBox>
        </Grid>
      </MainGrid>
    </ProductLayout>
  );
};

export default Product;
