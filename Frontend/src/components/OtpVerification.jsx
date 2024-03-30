import axios from "../services/axiosInterceptor.js";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function OtpVerification({ value }) {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parseInt(otp)) {
      setErrorMsg("invalid otp");
    } else {
      const response = await axios.post(
        value === "doctor" ? `doctor/verify/${email}` : `verify/${email}`,
        { otp: parseInt(otp) }
      );
      if (response.data.message === "Verified successfully") {
        await Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        if (value === "doctor") {
          navigate("/doctor-login");
        } else {
          navigate("/login");
        }
      } else {
        setErrorMsg("Invalid otp");
      }
    }
  };

  const handleResendOtp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        value === "doctor" ? `doctor/resendOtp/${email}` : `resendOtp/${email}`
      );
      if (response.data.message === "Check mail") {
        console.log('otp received');
        setCountdown(10)
        setResendDisabled(false)
      } else {
        console.error("OTP resend failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  
  

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setResendDisabled(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  });

  return (
    <>
      <div className="max-w-md mx-auto my-14 p-6 bg-teal-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="otp" className="font-semibold">
              Enter OTP:
            </label>
            {errorMsg && (
              <div className="text-red-500 text-sm mt-1" role="alert">
                {errorMsg}
              </div>
            )}
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              placeholder="1234"
              className="py-2 px-3 mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {resendDisabled ? (
            <div className="mt-4 flex justify-center">
              <button
                className="py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-gray-400"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-teal-500  text-white rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
                onClick={handleSubmit}
              >
                Verify OTP
              </button>
            </div>
          )}

          {!resendDisabled && (
            <div className="mt-4 flex justify-center">
              <p>Time Remaining: 00:{countdown < 10 ? `0${countdown}` : countdown}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default OtpVerification;
