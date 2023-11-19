import axios from 'axios';

const axiosIns = axios.create({
    baseURL: "http://localhost:5000"
})

const blogApi = {
    getAll: () => {
        // read all data
        return axiosIns.request({
            url: '/blogs',
            method: 'get'
        })
    },
    getSingle: (id) => {
        // reading single data
        return axiosIns.request({
            url: `/blogs/${id}`,
            method: 'get'
        })
    },
    create: (blog) => {
        // creating new data
        return axiosIns.request({
            url: '/blogs',
            method: 'post',
            data: blog
        })
    },
    update: (blog,id) => {
        // updating existing data
        return axiosIns.request({
            url: `/blogs/${id}`,
            method: 'patch',
            data: blog
        })
    },
    delete: (id) => {
        // deleting existing data
        return axiosIns.request({
            url: `/blogs/${id}`,
            method: 'delete'
        })
    }
}

export default blogApi;