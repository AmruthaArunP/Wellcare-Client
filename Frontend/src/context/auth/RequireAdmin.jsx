import React from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

function RequireAdmin({}) {
    
    const {admin} = useAuth
    const location = useLocation();
    
    return admin ? <Outlet /> : <Navigate to="/admin-login" state={{ from: location }} replace />;
}

export default RequireAdmin
