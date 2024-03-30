import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import adminImage from '../../assets/admin.jpg'; 
import { validateEmail } from '../../components/Validation';
import axios from '../../services/axiosInterceptor.js';
import useAuth from '../../context/hooks/useAuth';

function AdminLoginPage() {

  const navigate = useNavigate();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [ errorMsg, setErrorMsg] = useState();

  const { setAdmin} = useAuth();

  useEffect(()=>{
    const Token = localStorage.getItem('adminToken');
    if(Token){
      navigate('/admin-homePage')
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setErrorMsg('Please fill all the blanks..');
      return
    }
    if(!validateEmail(email)){
      setErrorMsg('Invalid Email id,Please enter valid email id.')
      return
    }
    try {
      const response = await axios.post('admin/login',{
        email,
        password
      })
      if(response.data.error === 'invalid credentials'){
        console.log('error is........',response.data.error);
        setErrorMsg('Invalid Email or Password');
      }else{
        localStorage.setItem('adminToken', response.data.adminToken)
        setAdmin(true);
        navigate('/admin-homePage')
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMsg('An error occurred during login. Please try again later.');
    }
  }

  return (
    <div className="bg-blue-300 max-w h-screen container mx-auto  flex justify-center items-center">
      <div className="max-w-lg border-4 p-4  ">
        <img src={adminImage} alt="Admin" className=" mx-auto mb-6" /> 
        <div className=''>
        <h2 className=" text-3xl font-semibold mb-4 ">Admin Login</h2>
        {errorMsg && (
                <div
                  className="text-red-500 text-xl font-bold mt-1"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}
        <form  className="max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
          onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        </div>

      </div>
    </div>
  );
}

export default AdminLoginPage;
