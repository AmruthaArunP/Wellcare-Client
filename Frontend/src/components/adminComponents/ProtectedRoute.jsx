import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    if(localStorage.getItem('adminToken')){
        return children;
    }else{
        return <Navigate to='/admin-login'/>
    }
}

export default ProtectedRoute;
