import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Box from "@mui/material/Box";

const BannerSwiperBox = styled(Box)`
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

export const BannerSwiper = (props: any) => {
  const handleClickBanner = () => {
    console.log("banner click");
  };
  return (
    <BannerSwiperBox>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {props.bannerList.map((banner: any, index: number) => {
          return (
            <SwiperSlide key={index} onClick={handleClickBanner}>
              <img src={banner.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerSwiperBox>
  );
};
