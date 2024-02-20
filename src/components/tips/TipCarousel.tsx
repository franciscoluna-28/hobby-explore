"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { ActivityQueryResponse } from "@/services/activities/getActivities";
import { TipCarouselCard } from "./TipCarouselCard";
// import required modules
import { Pagination } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./styles.css"

// import required modules
import { Navigation } from 'swiper/modules';


export default function TipCarousel({
  tips,
}: {
  tips: ActivityQueryResponse["tips"];
}) {
  return (
    <Swiper spaceBetween={1} slidesPerView={'auto'} className="mySwiper bg-white overflow-hidden w-full h-full my-6"              modules={[Pagination, Navigation]} >
      {tips.map((tip, index) => {
        return (
          <SwiperSlide key={tip.tip_id}>
            <TipCarouselCard index={index} key={tip.tip_id} tip={tip} />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
}
