import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Menu(props) {

    let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;
    const navigate = useNavigate();
    

    const logoutHandler = () => {
        if(window.confirm('Do you want to logout ?')) {
            localStorage.removeItem("loginStatus")
            navigate('/login')
            toast.success("Logout successful")
            window.location.reload();
        } else {
            toast.warning("Logout Terminated")
        }
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
            <div className="container">
                <NavLink to={'/'} className="navbar-brand">Redux CRUD</NavLink>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id='menu'>
                    {
                        loginStatus ? (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to={'/'} className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/create'} className="nav-link">Create</NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to={'/login'} className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/register'} className="nav-link">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }

                    {
                        loginStatus ? (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink onClick = {() => logoutHandler()} className="nav-link btn btn-danger">Logout</NavLink>
                                </li>
                            </ul>
                        ) : null
                    }   
                </div>
            </div>
        </nav>
    )
}

export default Menu;