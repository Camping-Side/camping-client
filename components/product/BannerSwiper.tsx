import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BannerSwiperStyle = styled.div`
  .swiper {
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
  return (
    <BannerSwiperStyle>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {props.bannerList.map((banner: any) => {
          return (
            <SwiperSlide>
              <img src={banner.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerSwiperStyle>
  );
};
