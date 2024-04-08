import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function RequireUser() {
    
    const { user} = useAuth()
    const location = useLocation();
    //console.log("require user - user - after login:",user);
    
    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireUser
