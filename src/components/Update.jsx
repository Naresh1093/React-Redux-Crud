import React, { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retriveAll, updateBlog } from '../Action/blogAction';

function Update(props) {
  const [blog,setBlog] = useState({
    title: "",
    image: "",
    desc: "",
    isActive: true
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const initData = useCallback(() => {
    dispatch(retriveAll())
    .unwrap()
    .then(res => {
      console.log('single =', res)
      let single = res.find((item) => item.id == params.id)
      setBlog(single)
    }).catch(err => toast.error(err.message))
  },[])

  useEffect(() => {
    initData()
  },[])

  const readValue = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log('update =', blog)
      dispatch(updateBlog({ blog, id: params.id }))
      .unwrap()
      .then(res => {
        toast.success("Blog updated successfully")
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
                <h3 className="display-3 text-success">Update</h3>
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
                    <input type="submit" value="Update Blog" className='btn btn-outline-success'/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Update;