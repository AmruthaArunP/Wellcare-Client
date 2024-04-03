// redux slice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const {setCredentials, clearCredentials} = authSlice.actions;

export default authSlice.reducer;




// login

 async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      if(res.isBlocked === true){
        navigate('/login');
        toast.error("User is blocked");
        return;
      }
      dispatch(setCredentials({...res}));
      navigate('/')
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
      setError(err?.data?.message  || err.message);
    }
  }

//   privateRoute

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'; 

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? (<Outlet />) : (<Navigate to='/login' replace />);
}

export default PrivateRoute;


// navbar

const { userInfo } = useSelector((state)=>state.auth);
async function logoutHandler(e) {
    e.preventDefault();
    try {
        await logoutApiCall().unwrap();
        dispatch(clearCredentials());
        dispatch(clearPlaceCredentials());
        dispatch(clearVehicleCredentials());
        dispatch(clearRideCredentials());
        
        refetch();
        navigate('/')
    } catch (errror) {
        console.error(errror);
    }
}
<li className="nav-item text-center mx-2 mx-lg-1">
      
            <div>
              {userInfo ? (
                <a href="#" className='text-black-50 fw-bold' onClick={logoutHandler}>Logout</a>
              ) : (
                <Link to='/login' className='text-black-50 fw-bold'>Login</Link>
              )}
            </div>
            
         
        </li>