import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

    // localStorage.getItem(var name) => read the data from local storage
    let loginStatus = localStorage.getItem('loginStatus') || false;

    return (
        <React.Fragment>
            {
                loginStatus === "true" ? <Outlet /> : <Navigate to={'/login'} />
            }
        </React.Fragment>
    )
}

export default ProtectedRoute;