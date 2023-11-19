import { createAsyncThunk } from "@reduxjs/toolkit";
import blogApi from './../API/blogApi';

// createAsyncThunk(actionConst, callback method)

// read all data
export const retriveAll = createAsyncThunk("blog/retrive/all", async () => {
    const res = await blogApi.getAll()
    return res.data
})

// read single data
// export const retriveSingle = createAsyncThunk("blog/retrive/single", async (id) => {
//     const res = await blogApi.getSingle(id)
//     return res.data
// })

// create new data
export const createBlog = createAsyncThunk("blog/create", async (blog) => {
    const res = await blogApi.create(blog)
    return res.data // action.payload
})

// updating existing data
export const updateBlog = createAsyncThunk("blog/update", async ({blog, id}) => {
    const res = await blogApi.update(blog,id)
    return res.data
})

// deleting existing data
export const removeBlog = createAsyncThunk("blog/remove", async (id) => {
    await blogApi.delete(id)
    return { id }
})