import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';

function RequireDoctor() {

    const {doctor} = useAuth()
    
    const location = useLocation();

    return doctor ? <Outlet /> : <Navigate to="/doctor-login" state={{ from: location }} replace />;
}

export default RequireDoctor
