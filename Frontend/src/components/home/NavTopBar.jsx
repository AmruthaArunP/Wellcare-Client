import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../context/hooks/useAuth";

function NavTopBar({value}) {

   const { setUser, setDoctor } = useAuth();
  const userData = useSelector((state) => state.user.data)
  const docData = useSelector((state) => state.doctor.data)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    if (value === 'doctor') {
      localStorage.removeItem("doctorToken");
      // dispatch(clearDocdata());
      setDoctor(false);
      navigate("/");
    } else {
      localStorage.removeItem("userToken");
      // dispatch(clearUserdata());
      setUser(false);
      navigate("/");
    }
  };



  return (
    <nav className="bg-teal-500 max-w-screen mx-auto flex flex-wrap flex-col md:flex-row md:justify-between md:items-center mt-0">
      <div className="mx-4 my-6 md:mx-24 text-2xl flex-col items-center text-white justify-between">
        <Link to="/">
          <div>
            <p className="hover:text-black font-bold cursor-pointer font-[Poppins]">
              WELL CARE
            </p>
          </div>
          <div>
            <p className="text-xl ml-2">Online Doctor</p>
          </div>
        </Link>
      </div>

      <div className="md:flex items-center ml-4">
        <div className="flex-wrap flex-col flex sm:flex-row  ">

          <Link to="/findDoctors" className="mx-4 text-xl hover:text-black text-white">
            DOCTORS
          </Link>
          <Link to="/specialities" className="mx-4 text-xl hover:text-black text-white">
            SPECIALTIES
          </Link>
          <Link to="#" className="mx-4 text-xl hover:text-black text-white">
            CONTACT US
          </Link>
        </div>
      </div>

      <div className="flex items-center mx-4">
        {value === 'user' && userData ||value === 'doctor' && docData ? (
          <>
            <Link
              to={docData ? "/doctor-home-page" : "/user-home-page"}
              className="mx-2 text-xl text-white"
            >
              <AiOutlineUser
                size={40}
                className="bg-white text-black rounded hover:bg-black hover:text-white"
              />
            </Link>
            <button
              className="bg-white p-4 mx-4 my-6 rounded border border-black hover:bg-black hover:text-white duration-500"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-white p-4 mx-4 my-6 rounded border border-black hover:bg-black hover:text-white duration-500"
            onClick={handleLogout}>
              LOGIN / SIGN UP
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavTopBar;