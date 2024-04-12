import React, { useRef, useState } from "react";
import axios from "../services/axiosInterceptor.js";
import { validateEmail } from "./Validation.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
ForgotPassword.propTypes = {
  user: PropTypes.string
}


function ForgotPassword({ user }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const emailRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validate = validateEmail(email);
    if (!validate) {
      setErrorMsg('Please enter a valid email address');
    } else {
      try {
        const res = await axios.get(
          user === 'doctor'
            ? `doctor/forgotPassword/${email}`
            : `forgotPassword/${email}`
        );
        if (res.data === 'success') {
          setErrorMsg('');
          setShowEmailInput(false);
          setShowOtpInput(true);
        } else {
          setErrorMsg('Email not found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    console.log("email is :",email,otp );
    const res = await axios.post(
      user === 'doctor' ? `doctor/verify/${email}` : `verify/${email}`,
      { otp: parseInt(otp) }
    );

    if (res.data.message === 'Verified successfully') {
    
      await Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      if (user === 'doctor') {
        navigate(`/doctor-reset-password/${email}`);
      } else {
        navigate(`/reset-password/${email}`);
      }
    } else {
      setErrorMsg('Invalid otp');
    }
  };

  return (
    <div className="bg-teal-100 p-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Forgot Password
        </h2>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        <form >
          {showEmailInput && (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
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
          )}

          {showEmailInput && (
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 font-bold rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
              onClick={(e) => handleSubmit(e)}
            >
              Send mail
            </button>
          )}

{showOtpInput && (
              <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-600"
              >
                Enter OTP:
              </label>
              <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e)=> setOtp(e.target.value)}
            maxLength={4}
            placeholder="1234"
            className="py-2 px-3 mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
            </div>
          )}

          {showOtpInput && (
              <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 font-bold rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
              onClick={ handleOtp}
            >
              Submit
            </button>
          )}


        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
