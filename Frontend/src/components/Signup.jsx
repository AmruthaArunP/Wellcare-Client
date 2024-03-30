import React, { useState } from "react";
import axios from '../services/axiosInterceptor.js'
import registrationImage from "../assets/doctor.png";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.js";
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "./Validation";

function Signup({ value }) {

  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()
  const [Name, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState(1);
  const [Mobile, setMobile] = useState("");
  const [Password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMsg, setErrormsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormsg("");

    const errors = {};

    if (!Name) {
      errors.name = "Name is required.";
    }
    if (!Email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(Email)) {
      errors.email = "Invalid Email id, please enter a valid email id.";
    }
    if (!Age) {
      errors.age = "Age is required.";
    } else if (Age <= 1 || Age > 120) {
      errors.age = "Please enter a valid age.";
    }
    if (!Mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!validateMobileNumber(Mobile)) {
      errors.mobile = "Mobile number can only have 10 digits, please enter a valid mobile number.";
    }
    if (!Password) {
      errors.password = "Password is required.";
    } else if (!validatePassword(Password)) {
      errors.password = "Password should have a capital letter, symbol, number, and at least 6 characters.";
    }
    if (!cPassword) {
      errors.cPassword = "Confirm Password is required.";
    } else if (Password !== cPassword) {
      errors.cPassword = "Passwords do not match.";
    }
  
    if (Object.keys(errors).length > 0) {
      // Set the error message state
      setErrormsg(errors);
      return;
    }

    const formData = new FormData();
    formData.append("name", Name);
    formData.append("email", Email);
    formData.append("age", Age);
    formData.append("mobile", Mobile);
    formData.append("password", Password);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    console.log(formData);
    
    value === 'doctor' ? 
    await axios.post( 'doctor/signup',formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // Important to set this header for file uploads
    },
    }).then(res => {
      if(res.data.message === 'Check mail'){
        navigate(`/doctor-emailVerification/${res.data.email}`)
      }else{
        alert(res.data.error);
      }
    }) 
    :
    await axios.post('signup', {
      Name,
      Email,
      Age,
      Mobile,
      Password
    }).then(res =>{
      console.log('coming data....',res.data);
      if(res.data.message === 'Check mail'){
        navigate(`/verify/${res.data.email}`)
      } else{
        alert(res.data);
      }
    })

  };

  const submitSignUpWithGoogle = async (displayName, email) => {
    try {
      const value = { displayName, email };
    const response =  await axios.post('google/signup', value);
      if (response.status === 201) {
        // Registration successful, navigate to the login route
        navigate('/login');
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          setErrormsg(axiosError.response.data.error);
        } else {
          setErrormsg('Network Error occurred.');
        }
      }
    }
  };

  const signUpWithGoogle = () => {
       
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
  
        if (displayName && email) {
          submitSignUpWithGoogle(displayName, email);
        }
      })
      .catch((error) => {
        setErrormsg(error.message);
      });
  };

  return (
    <>
      <div className="p-10 max-w min-h-screen flex items-center justify-center rounded-md shadow-xl border-4">

        <div className="w-2/3 p-6 bg-teal-100 rounded-md shadow-md flex items-center">
          <div className="mr-6 w-1/2">
            <img
              src={registrationImage}
              alt="Registration Image"
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-grow items-center">
            <h2 className="text-3xl font-semibold text-teal-500 mb-6">
              {value === "doctor" ? "Doctor Registration" : "User Registration"}
            </h2>
            {value !== 'doctor' && 
            <div className="text-center"> 
            <button className="w-full bg-teal-500 text-white font-bold py-2 rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
            onClick={signUpWithGoogle}>
                <img src="/googlelogo.png" alt="" className="w-5 mr-2" /> Signup with Google
            </button>
            <div className="mb-4 text-teal-500 font-bold">OR</div>
        </div>}

            <form>

              {errorMsg.name && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.name}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={Name}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {errorMsg.email && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.email}
                </div>
              )}
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
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {errorMsg.age && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.age}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-600"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  max={120}
                  min={1}
                  value={Age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {errorMsg.mobile && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.mobile}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={Mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {errorMsg.password && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.password}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              {errorMsg.cPassword && (
                <div
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errorMsg.cPassword}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {value === "doctor" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  {/* Display selected images */}
                  <div className="d-flex flex-wrap horizontal-scroll-container">
                    <div className="horizontal-scroll-content flex-raw d-flex">
                      {selectedImage && (
                        <div className="d-flex flex-column">
                          <img
                            className="me-2 mt-2"
                            width={"100px"}
                            height={"80px"}
                            src={URL.createObjectURL(selectedImage)}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-teal-500 text-white font-bold py-2 rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
              >
                Register
              </button>
            </form>
            <p className="font-bold text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-500 hover:underline"
              >
                LOGIN
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
