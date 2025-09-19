import React, {} from "react";
import { motion } from "framer-motion";

const imgData = [
  {
    id: 1,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/insta-1.jpg?crop=center&height=411&v=1729743596&width=411",
  },
  {
    id: 2,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/insta-2.jpg?crop=center&height=411&v=1729743596&width=411",
  },
  {
    id: 3,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/insta-3.jpg?crop=center&height=411&v=1729743596&width=411",
  },
  {
    id: 4,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/insta-4.jpg?crop=center&height=411&v=1729743596&width=411",
  },
  {
    id: 5,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/insta-5.jpg?crop=center&height=411&v=1729743596&width=411",
  },

];
const ViewProductSection = () => {

  return (
    <div id="testimonial-container" className="w-full h-[70vh]">
      <div id="new-product-header" className="py-10 text-center">
        <h2 className="text-5xl sm:text-3xl capitalize">Our Instagram</h2>
      </div>
      <div id="img-instagram-container" className="w-full h-full relative">
        <motion.div
          className="absolute flex whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 14,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div
            id="img-instagram-container"
            className="min-w-screen h-[20%] flex flex-nowrap gap-5 overflow-x-auto"
          >
            {imgData.map((img) => (
              <CardInstagram key={img.id} imgSrc={img.imgSrc} id={img.id} />
            ))}
          </div>
        </motion.div>
        <motion.div
          className="absolute  flex whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            delay: 7,
            duration: 14,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div
            id="img-instagram-container"
            className={`mx-5 min-w-screen h-[20%] flex flex-nowrap gap-5 overflow-x-auto`}
          >
            {imgData.map((img) => (
              <CardInstagram key={img.id} imgSrc={img.imgSrc} id={img.id} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewProductSection;

const CardInstagram = ({ imgSrc, id }) => {
  return (
    <div
      id="card-instagram"
      className="w-[50vw] sm:w-[30vw] h-full flex-shrink-0 rounded-md"
    >
      <img
        src={imgSrc}
        alt={`instagram-${id}`}
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
};
