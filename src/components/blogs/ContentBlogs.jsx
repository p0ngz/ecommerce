import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import PropTypes from "prop-types";

const contentData = {
  Accessories: [
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-4.jpg?crop=center&height=1080&v=1714982902&width=1410",
      date: "May 06, 2024",
      title: "Sleek Sophistication: The Artistry of Modern Jewelry Design",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-3.jpg?crop=center&height=1080&v=1714982810&width=1410",
      date: "May 06, 2024",
      title: "Elegant Charms: Embracing the Essence of Classic Style",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-2.jpg?crop=center&height=1080&v=1714982767&width=1410",
      date: "May 06, 2024",
      title: "Radiant Adornments: Adding Glamour to Your Ensemble",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
  ],
  BlingChronicles: [
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog.jpg?crop=center&height=1080&v=1714982935&width=1410",
      date: "May 06, 2024",
      title: "New season modern gold earrings",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
  ],
  Jewelry: [
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-9.jpg?crop=center&height=1080&v=1714983108&width=1410",
      date: "May 06, 2024",
      title: "Traveling Solo Is Awesome",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
  ],
  News: [
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-6.jpg?crop=center&height=1080&v=1714983019&width=1410",
      date: "May 06, 2024",
      title: "Fashion forward: Statement jewelry trends",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
    {
      img: "https://wpbingo-adena.myshopify.com/cdn/shop/articles/blog-5.jpg?crop=center&height=1080&v=1714982983&width=1410",
      date: "May 06, 2024",
      title: "The glamorous world of fine jewelry",
      description:
        "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
    },
  ],
};

const ContentBlogs = ({ type }) => {
  useEffect(() => {
    // console.log(type);
  }, [type]);
  return (
    <div id="blog-contents" className="w-full h-auto px-5">
      {contentData[type]?.map((item, index) => {
        return (
          <BlogCard
            key={index}
            img={item.img}
            title={item.title}
            date={item.date}
            description={item.description}
            isBlogsPage={true}
          />
        );
      })}
    </div>
  );
};
ContentBlogs.PropTypes = {
  type: PropTypes.string,
};
export default ContentBlogs;
