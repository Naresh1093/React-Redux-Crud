import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from './../Action/blogAction';

function Create(props) {
  const [blog,setBlog] = useState({
    title: "",
    image: "",
    desc: "",
    isActive: true
  })

  const dispatch = useDispatch()  // action dispatcher
  const navigate = useNavigate()  // navigate ref

  const readValue = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log('new =', blog)
      dispatch(createBlog(blog))
      .unwrap()
      .then(res => {
        toast.success('New Blog created successfully')
        navigate('/')
      })
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Create</h3>
            </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form autoComplete='off' onSubmit={submitHandler}>
                  <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' value={blog.title} onChange={readValue} id='title' className='form-control' required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="image">Image URL</label>
                    <input type="url" name='image' value={blog.image} onChange={readValue} id='image' className='form-control' required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" value={blog.desc} onChange={readValue} id="desc" className='form-control' cols="30" rows="10" required></textarea>
                  </div>
                  <div className="form-group mt-2">
                    <input type="submit" value="Create Blog" className='btn btn-outline-success'/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Create;