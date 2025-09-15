import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardNewProduct from "./CardProduct";
import ModalCardProduct from "./ModalCardProduct";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../assets/css/cardBreadcrumb.css";

const CardBreadcrumb = ({ relatedProducts }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const countRelatedProducts = relatedProducts.length;
  const breakpoints = {
    320: { slidesPerView: Math.min(1, countRelatedProducts), spaceBetween: 10 },
    640: { slidesPerView: Math.min(2, countRelatedProducts), spaceBetween: 20 },
    768: { slidesPerView: Math.min(2, countRelatedProducts), spaceBetween: 20 },
    1024: {
      slidesPerView: Math.min(3, countRelatedProducts),
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: Math.min(5, countRelatedProducts),
      spaceBetween: 30,
    },
  };
  const [activeModel, setActiveModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const receiveData = (data) => {
    setDataModal(data.data);
    setActiveModal(data.open);
  };
  const handleSwiper = (swiper) => {
    if (swiper.slides.length <= swiper.params.slidesPerView) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };
  return (
    <div className="relative w-[75%] h-[75%]  lg:w-[90%] flex justify-center items-center ">
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onResize={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
          handleSwiper(swiper);
        }}
        onInit={(swiper) => {
          console.log("swiper: ", swiper);
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
          handleSwiper(swiper);
        }}
        onSlideChange={handleSwiper}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={breakpoints}
      >
        {relatedProducts &&
          relatedProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <CardNewProduct
                key={index}
                imgSrc={product.imgSrc}
                discount={product.discount}
                rating={product.rating}
                titleProduct={product.titleProduct}
                price={product.price}
                type={product.type}
                viewState={true}
                isRelateProduct={true}
                sendDataToModal={receiveData}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {showNav && (
        <button ref={prevRef} className="custom-swiper-prev">
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
      )}
      {showNav && (
        <button ref={nextRef} className="custom-swiper-next">
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      )}
      {activeModel ? (
        <ModalCardProduct toggleState={activeModel} dataModal={dataModal} />
      ) : null}
    </div>
  );
};

export default CardBreadcrumb;
