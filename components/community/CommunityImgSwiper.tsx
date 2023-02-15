import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Box from "@mui/material/Box";

const CommunityImgSwiperBox = styled(Box)`
  .swiper {
    .swiper-slide {
      cursor: pointer;
    }
    &-pagination-fraction {
      width: 10% !important;
      height: 33px;
      line-height: 33px;
      background-color: rgba(206, 205, 205, 0.9);
      margin-left: 85%;
      margin-bottom: 3%;
      color: #919191;
      border-radius: 25px;
      font-weight: 600 !important;
    }
    &-pagination-current {
      color: white;
    }
    &-button-next {
      padding: 10px;
      border-radius: 10px;
      background-color: rgba(232, 231, 230, 0.7);
      color: white;
      --swiper-navigation-size: 34px;
    }
    &-button-prev {
      padding: 10px 10px 10px 10px;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(232, 231, 230, 0.7);
      color: white;
      --swiper-navigation-size: 34px;
    }
  }
`;

type Props = {
  imgList: string[];
};

export const CommunityImgSwiper = (props: Props) => {
  return (
    <CommunityImgSwiperBox>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {props.imgList.map((src: string, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img src={src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CommunityImgSwiperBox>
  );
};
