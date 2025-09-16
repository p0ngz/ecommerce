import { createSlice } from "@reduxjs/toolkit";

const initialBlogState = {
  img: "",
  title: "",
  date: "",
  description: "",
};
const blogSlice = createSlice({
    name: "blog",
    initialState: initialBlogState,
    reducers: {
        setBlog: (state, action) => {
            const { img, title, date, description } = action.payload;
            const newBlog = { img, title, date, description };
            state.blog = newBlog;
        }
    }
})

export const { setBlog} = blogSlice.actions
export default blogSlice.reducer 