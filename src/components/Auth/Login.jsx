import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [user,setUser] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const readValue = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault()

        try {
            let extData = users.find((item) => item.email === user.email)

            if(!extData) {
                toast.error(`${user.email} is doesn't exists`)
            } else if(extData.password !== user.password) {
                toast.error("Incorrect Password")
            } else {
                localStorage.setItem('loginStatus', true)
                toast.success("Login successful")
                navigate("/")
            }
        } catch (error) {
            
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Login</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' 
                                value={user.email} onChange={readValue} id='email' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' 
                                value={user.password} onChange={readValue} id='password' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Login" className='btn btn-outline-success' />
                            </div>  
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;