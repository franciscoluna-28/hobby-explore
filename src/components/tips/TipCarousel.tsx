"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { ActivityQueryResponse } from "@/services/activities/getActivities";
import { TipCarouselCard } from "./TipCarouselCard";
// import required modules
import { Pagination } from 'swiper/modules';


// import styles bundle
import 'swiper/css/bundle';


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
    <Swiper spaceBetween={1}    navigation={true}  breakpoints={{
      320: {
        slidesPerView: 1, 
        spaceBetween: 10
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 5
      },
      1080: {
        slidesPerView: 2.2,
        spaceBetween: 10
      }
    }} slidesPerView={2.5} className="max-w-[900px] my-6 rounded-lg" modules={[Navigation]}               >
      {tips.map((tip, index) => {
        return (
          <SwiperSlide key={tip.tip_id}>
            <TipCarouselCard index={index} key={tip.tip_id} tip={tip} />
          </SwiperSlide>
        );
      })}
      
    </Swiper>
  );
}
