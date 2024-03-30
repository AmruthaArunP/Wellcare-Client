import React from 'react'
import { useNavigate } from 'react-router-dom'

function DocPrescription() {
  
  const navigate = useNavigate()

  const handleCreateButton = () => {
    navigate('/doctor-createPrscription')
  }

  return (
    <div className='text-center p-3 m-5 border rounded-lg shadow-lg '>
      <div className="w-full flex flex-wrap px-4 justify-between  gap-20">
        <h2 className="text-4xl text-teal-600 font-bold mb-4 underline text-center mx-4">Prescriptions</h2>
        <button className="text-white font-bold text-lg border py-2 px-4 rounded bg-teal-500 mx-4" onClick={handleCreateButton} >
          Create Prescription
        </button>
      </div>
    </div>
  )
}

export default DocPrescription
