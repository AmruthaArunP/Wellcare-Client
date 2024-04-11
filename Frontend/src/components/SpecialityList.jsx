import React from 'react'
import { Link } from 'react-router-dom';

function SpecialityList({specialityData}) {
    console.log('speciality data in list:',specialityData);
  return (
<>
  <div className="mx-auto max-w-screen-xl bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 m-4 p-6 rounded">
    {specialityData.length > 0 ? (
      specialityData.map((speciality, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <img src={`${speciality.image}`} alt={speciality.name} className="w-full h-56 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-semibold text-teal-500 text-center">{speciality.name}</h2>
          </div>

        </div>
      ))
    ) : (
      <div>No doctor found</div>
    )}
  </div>
</>


  )
}

export default SpecialityList
