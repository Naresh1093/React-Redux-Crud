import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retriveAll, removeBlog } from '../Action/blogAction';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home(props) {
  const [blogs,setBlogs] = useState([])
  const dispatch = useDispatch()

  const retriveData = async () => {
    await dispatch(retriveAll())
    .unwrap()
    .then(res => {
      setBlogs(res)
    }).catch(err => toast.error(err.message))
  }

  const initData = useCallback(() => {
    retriveData()
  },[])

  useEffect(() => {
    initData()
  },[initData])

  // // To read the data from redux memo hook
  // const blogs = useSelector(item => item.blogs)


  const deleteHandler = async (id) => {
    if(window.confirm(`Do you want to delete blog id = ${id} ?`)) {
      await dispatch(removeBlog(id))
      .unwrap()
      .then(res => {
        toast.success('Blog deleted successfully')
        window.location.reload()
      }).catch(err => toast.error(err.message))
    }
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Home</h3>
            </div>
        </div>

        <div className="row">
          {
            blogs && blogs.map((item,index) => {
              return (
                <div className="col-md-4 col-lg-4 col-sm-12 mt-2" key={index}>
                  <div className="card">
                    <img src={item ? item.image : ''} alt="no image found" className='card-img-top'/>
                    <div className="card-body">
                      <h3 className="text-center text-success">
                        { item.title }
                      </h3>
                      <details>
                        <summary>Description</summary>
                        <p className="text-secondary text-justify"> {item.desc} </p>
                      </details>
                    </div>
                    <div className="card-footer">
                      <NavLink to={`/update/${item.id}`} className="btn btn-sm btn-outline-info">
                        <i className="bi bi-pencil-fill"></i>
                      </NavLink>
                      <button onClick={() => deleteHandler(item.id)} className="btn btn-sm btn-danger float-end">
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Home;