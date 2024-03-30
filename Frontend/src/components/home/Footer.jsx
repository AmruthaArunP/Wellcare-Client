import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <>
    <footer className="bg-teal-500 text-white py-8">
      <div className="container mx-auto mx-4 my-6 md:mx-24 text-2xl flex-col items-center text-white justify-between">
        <Link to="/" className="flex flex-col items-center">
          <p className="hover:text-black font-bold cursor-pointer font-[Poppins]">
            WELL CARE
          </p>
          <p className="text-xl ml-2">Online Doctor</p>
       

        </Link>
        <div className="flex flex-col md:flex-row md:justify-between mx-4 md:mx-20 border-b ">
          <div className="flex flex-col">
            <h2 className="text-lg underline font-semibold mb-4">For Patients</h2>
            <Link to="#" className=" text-base mb-2 hover:text-black">
              Search Doctor
            </Link>
            <Link to="#" className=" text-base mb-2 hover:text-black">
              Search for Clinics
            </Link>
            <Link to="#" className="text-base mb-2 hover:text-black">
              Search for Hospitals
            </Link>
            <Link to="#" className="text-base mb-2 hover:text-black">
              Full Body Checkup
            </Link>
            <Link to="#" className="text-base mb-2 hover:text-black">
              About Us
            </Link>
          </div>
          <div className="flex flex-col md:ml-8">
            <h2 className="font-semibold mb-4 underline text-lg">For Doctors</h2>
            <Link to="#" className="text-base mb-2 hover:text-black">
              Profile
            </Link>
            <Link to="#" className="text-base mb-2 hover:text-black">
              Hospitals
            </Link>
            <Link to="#" className="text-base mb-2 hover:text-black">
              Contact Us
            </Link>
          </div>
        </div>
        <div className='flex-col'>
        <div className="flex mt-8  w-1/2 mx-auto justify-center">
          {/* Social media icons go here */}
          <Link to="#" className="mr-4">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link to="#" className="mr-4">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#" className="mr-4">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
        <div className=' text-sm w-1/2 mx-auto  text-center'>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        </div>

      </div>
    </footer>
    </>
  )
}

export default Footer
