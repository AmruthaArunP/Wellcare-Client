import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    if(localStorage.getItem('adminToken')){
        return <Navigate to = '/admin-login'/>
    }else{
        return children;
    }
}

export default PublicRoute;
