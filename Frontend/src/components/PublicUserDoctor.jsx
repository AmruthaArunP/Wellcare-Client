import React from 'react'

function PublicUserDoctor({userType , children}) {
    if(userType && localStorage.getItem('token')){
        switch(userType) {
            case 'doctor':
                return <Navigate to='/'/>
            case 'user':
                return <Navigate to='/'/>
            default:
                return children;
        }
    } else {
        return children;
    }
    
}

export default PublicUserDoctor
