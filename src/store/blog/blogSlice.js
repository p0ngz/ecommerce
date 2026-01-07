import { axiosClient } from "../../config/axios";
const initialBlogState = [];
export const createBlogSlice = (set, get) => ({
  blogs: initialBlogState,
  setBlogs: (blogData) => {
    set((state) => ({
      ...state,
      blogData,
    }));
  },
  getBlogs: () => {
    const blogs = get().blogs;
    return blogs;
  },
  getAllBlogs: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/blog", { params: { ...filter } });
      } else {
        response = await axiosClient.get("/blog");
      }
      const blogs = response?.data?.blogs;
      if (!blogs || blogs.length === 0) {
        console.error("No blogs found");
      }

      return blogs;
    } catch (err) {
      console.error("Error getBlog data: ", err);
    }
  },
  getBlogById: async (blogId) => {
    try {
      const response = await axiosClient.get("/blog/" + blogId);
      const blog = response?.data?.blog;

      if (!blog || Object.keys(blog).length === 0) {
        console.error("No blog data found for ID: ", blogId);
      }
      return blog;
    } catch (err) {
      console.error("Error fetching blog by ID: ", err);
    }
  },
  createBlog: async (blogData) => {
    try {
      const response = await axiosClient.post("/blog", blogData);
      const createdBlog = response?.data?.blog;
      if (!createdBlog || Object.keys(createdBlog).length === 0) {
        console.error("Failed to create new blog");
      }

      return createdBlog;
    } catch (err) {
      console.error("Error creating blog: ", err);
    }
  },
  updateBlogByBlogId: async (blogId, blogData) => {
    try {
      const response = await axiosClient.put("/blog/" + blogId, blogData);
      const updatedBlog = response?.data?.blog;
      if (!updatedBlog || Object.keys(updatedBlog).length === 0) {
        console.error("Failed to update blog for ID: ", blogId);
      }
      return updatedBlog;
    } catch (err) {
      console.error("Error updating blog by ID: ", err);
    }
  },
  deleteBlogByBlogId: async (blogId) => {
    try {
      const response = await axiosClient.delete("/blog/" + blogId);
      const deletedBlog = response?.data?.blog;
      if (!deletedBlog || Object.keys(deletedBlog).length === 0) {
        console.error("Failed to delete blog for ID: ", blogId);
      }
      return deletedBlog;
    } catch (err) {
      console.error("Error deleting blog by ID: ", err);
    }
  },
});
