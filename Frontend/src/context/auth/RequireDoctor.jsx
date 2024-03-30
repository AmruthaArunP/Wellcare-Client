import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireDoctor() {
    
    const {doctor } = useAuth();
    const location = useLocation();

    return doctor ? <Outlet /> : <Navigate to="/doctor-login" state={{ from: location }} replace />;
}

export default RequireDoctor