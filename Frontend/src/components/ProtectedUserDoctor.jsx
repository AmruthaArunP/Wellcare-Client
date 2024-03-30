import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedUserDoctor({userType , children}) {
    if(userType && localStorage.getItem('token')){
        return children;
    } else{
        switch(userType){
            case 'doctor':
                return <Navigate to='/'/>
            case 'user':
                return <Navigate to='/'/>
            default:
                return children;
        }        
    }      
    
}

export default ProtectedUserDoctor
