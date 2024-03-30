import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TiTick } from "react-icons/ti";


function DocSuccess() {

  const navigate = useNavigate()

  const handleHome = useCallback(() => {
    navigate('/doctor-home-page')
  }, [navigate])

  const handlePrescription = useCallback(() => {
    navigate('/doctor-consultation')
  }, [navigate])


  return (
<>
<div className="flex justify-center items-center max-w-screen-md mx-auto bg-teal-100 m-6">
      <div className="text-center w-full h-48 p-4">
        <TiTick className="w-12 h-12 mx-auto text-green-500 border rounded-full bg-white" />
        <h4 className="text-xl font-bold">
        You have completed the consultation
        </h4>
        <p>Thank You.</p>
        {/* <button className="btn btn-success" onClick={handleHome}>Home</button> */}
        <button className="bg-teal-600 px-4 py-2 rounded text-white font-bold" onClick={handlePrescription}>Write Prescription</button>
      </div>
    </div>
</>
  )
}

export default DocSuccess
