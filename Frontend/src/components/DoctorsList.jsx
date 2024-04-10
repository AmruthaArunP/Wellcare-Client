import React, { useState } from 'react'
import { setDoc } from '../redux/selectedDoctor';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';

function DoctorsList({docData}) {

  const {user} = useAuth();
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleCheck = async (e) => {
    console.log("doc data:", e);
    if(user){
      dispatch(setDoc(e))
      navigate('/booking-appoinment')
    }else{
      setErrorMsg('Please login your account')
      setTimeout(()=>{
        setErrorMsg('')
      },3000)
    }

  }

  return (
    <>
    {errorMsg && <p className='text-red-500 text-center font-bold'>{errorMsg}</p>}
      <div className="mx-auto max-w-screen-xl bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 m-4 p-6 rounded">
        

        {docData.length > 0 ? (
        docData.map((doctor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img src={`${import.meta.env.VITE_BASE_URL}images/${doctor.image}`} alt={doctor.name} className="w-full h-56 object-cover mb-4 rounded-md"  />
            <h2 className="text-lg font-semibold">Dr.{doctor.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{doctor.qualification}</p>
            <p className="text-sm text-gray-600 mb-2">{doctor.qualification}</p>
            <p className="text-sm text-gray-600 mb-2">Rs.{doctor.fee}</p>
            <button className="bg-teal-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
            onClick={() => handleCheck(doctor)}
            >
              Check availability
            </button>
          </div>
        ))
      ):(
        <div>No doctor found</div>
      )}
      </div>
    </>

  )
}

export default DoctorsList
