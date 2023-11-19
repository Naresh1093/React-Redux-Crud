import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './../Reducer/blogReducer';

const blogStore = configureStore({
    reducer: blogReducer,
    devTools: true
})

export default blogStore;
