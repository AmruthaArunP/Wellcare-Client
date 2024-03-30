import React from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

function RequireUser({}) {
    
    const {user} = useAuth();
    const location = useLocation();
    
    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireUser
