import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { validateEmail } from "./Validation.js";
import useAuth from "../context/hooks/useAuth.js";
import banerimage from "../assets/baner1.jpg";
import axios from "../services/axiosInterceptor.js";
import doctorAxios from "../services/doctorAxiosInterceptor.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userData.js";
import { setDoctorData } from "../redux/doctorData.js";

function Login({ value }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, doctor, setUser, setDoctor } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const Doctoken = localStorage.getItem("doctorToken");
    console.log("userToken - useEffect-login=", userToken);
    console.log("docToken - useEffect-login=", Doctoken);
    console.log("value in login-useEffect", value);

    // if (value && value === "doctor") {
    //   if (Doctoken) {
    //     navigate("/doctor-home-page");
    //   } else {

    //   }
    // } else if (value && value === "user") {
    //   if (userToken) {
    //     navigate("/");
    //   } else {
    //   }
    // }

    if (value) {
      if (value === "doctor" && Doctoken) {
        navigate("/doctor-home-page");
      }
    } else {
      if (userToken) {
        navigate("/");
      }
    }
  }, [value]);

  // useEffect(()=>{
  //   console.log('login-useEffect - value is :',value);
  //   if(value === 'user'){
  //     navigate('/')
  //   }else if(value === 'doctor'){
  //     navigate('/doctor-home-page')
  //   }

  // },[user,doctor])

  const handleDrLogInNav = () => {
    localStorage.removeItem("doctorToken");
    navigate("/doctor-login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill all the blanks..");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Invalid Email id,Please enter valid email id.");
      return;
    }
    try {
      let response;
      if (value === "doctor") {
        response = await doctorAxios.post("doctor/login", { email, password });
      } else {
        response = await axios.post("login", { email, password });
      }
      if (response.data.error === "unauthorized") {
        setErrorMsg("Invalid email or password");
      } else if (response.data.error === "unverified") {
        setErrorMsg("Email not verified. Please check your email.");
      } else if (response.data.error === "blocked") {
        console.log("blocked:", response.data.error);
        setErrorMsg(
          "This account has been blocked. Please contact the support team."
        );
      } else {
        if (value === "doctor") {
          localStorage.setItem("doctorToken", response.data.token);
          console.log("doc email in login:", response.data.doctorData.email);
          localStorage.setItem("doctorEmail", response.data.doctorData.email);
          dispatch(setDoctorData(response.data.doctorData));
          setDoctor(true);
          navigate("/doctor-home-page");
        } else {
          console.log(
            "user token before storing local storage:",
            response.data.token
          );
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userEmail", response.data.userData.email);
          dispatch(setUserdata(response.data.userData));
          setUser(true);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const submitSignInWithGoogle = async (displayName, email) => {
    try {
      const value = { displayName, email };

      const response = await axios.post("google/signin", value);
      console.log(response);
      localStorage.setItem("userToken", response.data.token);
      console.log(localStorage.getItem("userToken"));
      dispatch(setUserdata(response.data.userData));

      setUser(true);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          setErrorMsg(axiosError.response.data.error);
        } else {
          setErrorMsg("Network Error occurred.");
        }
      }
    }
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;

        if (displayName && email) {
          submitSignInWithGoogle(displayName, email);
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <>
      <div className="bg-teal-100 m-16 max-w-screen-md border-4 mx-auto flex items-center justify-center rounded-md shadow-xl ">
        <div className="hidden sm:block sm:w-0 md:w-1/2">
          <img
            src={banerimage}
            alt="Login Image"
            className=" object-cover rounded-full "
          />
        </div>
        <div className="w-full md:w-1/2 p-6 items-center">
          <div className="flex-grow">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
              {value === "doctor" ? "Doctor Login" : "User Login"}
            </h2>
            {errorMsg && (
              <div className="text-red-500 text-sm mt-1" role="alert">
                {errorMsg}
              </div>
            )}

            <form>
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className=" w-full bg-teal-500 text-white py-2 font-bold rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
                onClick={handleSubmit}
              >
                Login
              </button>
              {value !== "doctor" && (
                <div className="text-center">
                  <div className=" text-teal-500 font-bold">OR</div>

                  <button
                    className="w-full bg-teal-500 text-white font-bold py-2 rounded-md hover:bg-black hover:text-white focus:outline-none focus:bg-blue-600"
                    onClick={signUpWithGoogle}
                  >
                    <img src="/googlelogo.png" alt="" className="w-5 mr-2" />{" "}
                    SignIn with Google
                  </button>
                </div>
              )}
            </form>
            <p className="mt-2 text-sm text-gray-600">
              {!value ? (
                <Link
                  to="/forgot-password"
                  className="font-bold text-teal-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              ) : (
                <Link
                  to="/doctor-forgot-password"
                  className="font-bold text-teal-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              )}
            </p>
            <p className="text-gray-600 mt-4">
              {!value ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-teal-500 hover:underline"
                  >
                    SIGN UP
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/doctor-signup"
                    className="font-bold text-teal-500 hover:underline"
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </p>
            {!value && (
              <p className="font-bold text-gray-600 mt-4">
                Are you a Doctor?{"  "}
                <Link
                  to="/doctor-login"
                  className="font-bold text-teal-500 hover:underline"
                >
                  <button
                    className="font-bold text-teal-500 hover:underline"
                    onClick={handleDrLogInNav}
                  >
                    LOGIN
                  </button>
                </Link>{" "}
                here
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
