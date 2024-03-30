import React, { useState, useEffect } from 'react';
import './UserOtp.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendOtpMutation } from '../../Slices/userApiSlice';

const UserOtp = () => {

    const [otpDigits, setOtpDigits] = useState("");
    const [minutes,setMinutes] = useState(1);
    const [seconds,setSeconds] = useState(29);

    const { userInfo } = useSelector((state)=>state.auth);
    console.log(userInfo);
    const id = useParams();

    const [ sendOtp, {isLoading, error, refetch} ] = useSendOtpMutation();

    const sendOtpFn = async (id) => {
        console.log(id);
        const res = await sendOtp(id).unwrap();
        console.log(res);
    }

    useEffect(() => {

        sendOtpFn();

        const interval = setInterval(()=>{
            if(seconds>0){
                setSeconds(seconds-1)
            }
            if(seconds===0){
                if(minutes===0){
                    clearInterval(interval);
                }else{
                    setSeconds(59);
                    setMinutes(minutes-1)
                }
            }
        },1000)

        return()=>{
            clearInterval(interval);
        }

    }, [seconds])

    const navigate = useNavigate();

    const resendOtp = () => {
        setMinutes(1);
        setSeconds(59);
    }

    const handleVerify = async () => {
        
        console.log(otpDigits);
        if(otpDigits === userInfo.otp){
            toast.success("OTP verified")
            navigate('/')
        }else{
            toast.error("OTP doesnot match");
            return;
        }
        
    };

  return (
      <>
    <div className="container p-5">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5 mt-5">
                <div className="bg-white p-5 rounded-3 shadow-sm border">
                    <div>
                        <p className="text-center text-success" style={{fontSize: '5.5rem'}}><i className="fa-solid fa-envelope-circle-check"></i></p>
                        <p className="text-center text-center h5 ">Please check your email</p>
                        <p className="text-muted text-center">We've sent a code to {userInfo.email}</p>
                        <div className="row pt-4 pb-2">
                      
                            <div  className="col-3">
                                <input
                                    className="otp-letter-input "
                                    type="text"
                                    value={otpDigits}
                                    onChange={(e) => setOtpDigits(e.target.value)}
                                />
                            </div>
         
                        </div>
                        <p className="text-muted text-center">Didn't get the code? 
                        <button
                        onClick={resendOtp}
                        disabled={seconds>0 || minutes>0}
                        className="text-success border-0 "
                        >
                            Click to resend.
                        </button></p>

                           <div className='countdown-text'>
                                Time Remaining : {""}
                                <span style={{fontWeight:600}}>
                                    {minutes < 10 ? 0${minutes} : minutes }:
                                    {seconds < 10 ? 0${seconds} : seconds }
                                </span>
                            </div> 

                        <div className="row pt-5">
                
                            <div className="col-6">
                                <button className="btn btn-success w-100" onClick={handleVerify}>Verify</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UserOtp;




import axios from "../services/axiosInterceptor.js";
import React , {useEffect, useState} from "react";
import { useParams , useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function OtpVerification({value}) {
    const {email} = useParams();
    const navigate = useNavigate();
    const [otp , setOtp] = useState('');
    const [errorMsg , setErrorMsg] = useState('');
    const [resendDisabled , setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(60)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!parseInt(otp)){
            setErrorMsg('invalid otp')
        }else{
            const response = await axios.post(
                value === 'doctor' ? 
                 `doctor/verify/${email}` :
                 `verify/${email}` ,
                {otp : parseInt(otp)}
            );
            if(response.data.message === 'Verified successfully') {
              await Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',          
              }); 
                if(value === 'doctor'){
                    navigate('/doctor-login');
                }else{
                    navigate('/login');
                }
            }else{
                setErrorMsg('Invalid otp');
            }
        }
    }


    const handleResendOtp = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(value === 'doctor' ?`doctor/resendOtp/${email}`: `resendOtp/${email}`);
            if(response.data.message === 'OTP resent successfully'){
                setCountdown(60);
                setResendDisabled(true);
            // Start the countdown timer
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false); // Enable the Resend button
                }
                return prevCountdown - 1;
                });
            }, 1000);
                            
            }else{
                console.error('OTP resend failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    }

    useEffect(() => {
        if(countdown === 0){
            setResendDisabled(false)
        }
    },[countdown])


  return (
    <>
      <div className="max-w-md mx-auto my-14 p-6 bg-teal-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center ">
          OTP Verification
        </h2>
        <form className="space-y-4" >
          <div className="flex flex-col">
            <label htmlFor="otp" className="font-semibold">
              Enter OTP:
            </label>
            {errorMsg && (
                    <div className="text-red-500 text-sm mt-1" role="alert">
                      {errorMsg}
                    </div>
          )
          }
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-teal-500  text-white rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
              onClick={handleSubmit} >
              Verify OTP
            </button>
          </div>
          <div className="mt-4 flex justify-center">
          <button className="py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-gray-400 "
          onClick={handleResendOtp}
          disabled={resendDisabled}
          >
            Resend OTP
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <p> Time Remaining : {countdown}</p>
        
        </div>
        </form>

      </div>
    </>
  );
}

export default OtpVerification;
