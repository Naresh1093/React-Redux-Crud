import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { retriveAll, retriveSingle, createBlog, updateBlog, removeBlog } from '../Action/blogAction';

// initial state
let initialState = [];

// reducer slices
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createBlog.fulfilled, (state,action) => {
            state.push(action.payload)
        })
        builder.addCase(retriveAll.fulfilled, (state,action) => {
            return [...action.payload]
        })
        // builder.addCase(retriveSingle.fulfilled, (state,action) => {
        //     return action.payload
        // })
        builder.addCase(updateBlog.fulfilled, (state,action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            state[index] = {
                ...state[index],
                ...action.payload
            }
        })
        builder.addCase(removeBlog.fulfilled, (state,action) => {
            let index = state.findIndex(item => item.id === action.payload.id)
            state.splice(index,1)
        })
    }
})

const blogReducer = combineReducers({
    blogs: blogSlice.reducer
})

export default blogReducer;