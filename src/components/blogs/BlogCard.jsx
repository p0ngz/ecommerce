import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setBlog } from "../../store/blogSlice";
// import { format } from "date-fns";
// const date = format(new Date(), "MMM dd, yyyy'");

const BlogCard = ({ img, title, date, description, isBlogsPage = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [descriptionTxt, setDescriptionTxt] = useState("");
  const goToBlogPage = (page) => {
    dispatch(setBlog({ img, title, date, description }));
    navigate(`/blogs/${page.split(" ").join("-")}`);
  };

  useEffect(() => {
    if (description.length > 100) {
      setDescriptionTxt(description.slice(0, 100) + "...");
    } else {
      setDescriptionTxt(description);
    }
  }, [description]);
  return (
    <div id="blog-card" className="w-full max-h[70vh] mt-5 mb-10">
      <div id="blog-img" className="w-full h-[50%]">
        {img ? <img src={img} alt={title} /> : null}
      </div>
      <div id="blog-info" className="w-full h-[30%] py-4 overflow-y-scroll">
        <p className="number text-gray-400">{date}</p>
        <h3 className="text-xl  my-2 hover:text-gray-500 cursor-pointer">
          {title}
        </h3>
        <p className={`text-gray-400 text-sm ${isBlogsPage ? "" : "leading-[2]"}`}>
          {isBlogsPage ? descriptionTxt : description}
        </p>
      </div>
      <div id="blog-action" className="w-full h-[20%]">
        {isBlogsPage && (
          <button
            id="btn-read-more"
            className="bg-black text-white py-2 px-10  sm:rounded-sm sm:hover:bg-zinc-800 hover:cursor-pointer"
            onClick={() => goToBlogPage(title)}
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
};
BlogCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  isBlogsPage: PropTypes.bool,
};
export default BlogCard;
