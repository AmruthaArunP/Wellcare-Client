import React, { useState } from "react";
import axios from '../services/axiosInterceptor.js'
import { validatePassword } from "./Validation";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword({value}) {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { email } = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!password || !confirmPassword){
      setErrorMsg('Please fill all the fields');
      return;
    }
   
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if(!validatePassword(password)){
      setErrorMsg('The password should have symbol,alphabet,capital letter,number.Please enter valid password')
      return
    }

    const response = await axios.patch(value === 'doctor' ? `doctor/resetPassword/${email}` : `resetPassword/${email}`,
    {password : password })

    if(response.data){
      console.log("message is:", response.data.message);
      setSuccessMsg('Password reset successfully!');
      value === 'doctor' ? (
        setTimeout(() => {
          localStorage.removeItem('doctorToken')
          navigate('/doctor-login')
      }, 2000)
      ) : (
        setTimeout(() => {
          localStorage.removeItem('userToken')
          navigate('/login')
      }, 2000)
      )

    }

    
  };

  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">


      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-teal-100 py-8 px-4  sm:rounded-lg sm:px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" text-center text-3xl font-bold text-teal-500">
          Reset Your Password
        </h2>
      </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-teal-500">
                New Password :
              </label>
              <input
                id="password"
                name="password"
                type="password"
                
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-teal-500">
                Confirm Password :
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>



            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
            {errorMsg && (
              <div className="text-red-600">{errorMsg}</div>
            )}

            {successMsg && (
              <div className="text-green-600 ">{successMsg}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
