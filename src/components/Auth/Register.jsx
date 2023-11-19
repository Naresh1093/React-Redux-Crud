import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const getRandomId = () => {
    return Math.floor(Math.random() * 10000);
}

function Register(props) {

    const [user,setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })

    const navigate = useNavigate() // Redirection to other component

    // Read the existing users data from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const readValue =(e) => {
        const { name, value } = e.target
        setUser({...user, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        try {
            let data = {
                id: getRandomId(),
                ...user
            }
            console.log('new user =', user)
            const extEmail = users.find((item) => item.email === user.email)
            const extMobile = users.find((item) => item.mobile === user.mobile)

            if(extEmail) {
                toast.warning(`${user.email} is already registered`)
            } else if(extMobile) {
                toast.warning(`${user.mobile} is already registered`)
            } else {
                users.push(data);
                localStorage.setItem("users", JSON.stringify(users))
                toast.success("New user registered successfully")
                navigate('/login')
            }


        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Register</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name'
                                value={user.name} onChange={readValue} id='name' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' 
                                value={user.email} onChange={readValue} id='email' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name='mobile' 
                                value={user.mobile} onChange={readValue} id='mobile' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password'
                                value={user.password} onChange={readValue}  id='password' className='form-control' required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Register" className='btn btn-outline-success' />
                            </div>  
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;