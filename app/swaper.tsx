import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Image from "next/image";
import { Picture } from "./types/picture";

interface SwiperBlockProps {
  pictures: Picture[];
}

const SwiperBlock: React.FC<SwiperBlockProps> = ({ pictures }) => {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {pictures.map((pic: Picture) => (
          <SwiperSlide key={pic.date}>
            {pic.media_type === "video" ? (
              <iframe
                width="500"
                height="300"
                src={pic.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : (
              <Image src={pic.url} alt={pic.title} width="500" height="300" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default SwiperBlock;
