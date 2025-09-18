import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { capitalizeHandler } from "../../utility/capitalizeHandler";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";
const BlogComponent = () => {
  const mainContainerRef = useRef();
  const navigate = useNavigate();
  const { blog } = useParams();
  const [blogName, setBlogName] = useState("");
  const blogState = useSelector((state) => state.Blog.blog);
  useEffect(() => {
    const removeDash = blog.split("-").join(" ");
    const blogName = capitalizeHandler(removeDash);
    setBlogName(blogName);
  }, [blog]);

  useEffect(() => {
    mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [])
  return (
    <div
      id="blog-container"
      className="py-10 ps-5 sm:ps-0 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
      ref={mainContainerRef}
    >
      <div id="blog-breadcrumbs" className="flex justify-start mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Typography
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate("/")}
            color="inherit"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "rem",
                lg: "1.2rem",
              },
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Home
          </Typography>
          <Typography
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate("/blogs")}
            color="inherit"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "rem",
                lg: "1.2rem",
              },
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Blogs
          </Typography>

          <Typography
            className="hover:cursor-pointer"
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
            }}
          >
            {blogName}
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="main-blog" className="w-full min-h-full" >
        <BlogCard
          img={blogState.img}
          title={blogState.title}
          date={blogState.date}
          description={blogState.description}
          isBlogsPage={false}
        />
      </div>
    </div>
  );
};

export default BlogComponent;
