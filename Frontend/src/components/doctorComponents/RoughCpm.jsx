import React , {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../services/axiosInterceptor.js'

function DocProfile() {
  
  const [doctor , setDoctor] = useState(null)
  const doctorEmail = useSelector(state => state.doctor.data.email)
  const doctorToken = localStorage.getItem('doctorToken')

  useEffect(()=>{
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`doctor/getDoctor/${doctorEmail}`,{
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        }) 
        setDoctor(response.data)
        console.log('image name is:', doctor.image);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    }
    fetchDoctor();
  },[doctorEmail])
  return (
    <>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Doctor Profile</h1>
      {doctor ? (
        <div>
          <div className="mb-4">
            <span className="font-bold">Name:</span> {doctor.name}
          </div>
          <div className="mb-4">
            <span className="font-bold">Age:</span> {doctor.age}
          </div>
          <div className="mb-4">
            <span className="font-bold">Email:</span> {doctor.email}
          </div>
          <div className="mb-4">
            <span className="font-bold">Contact:</span> {doctor.contact}
          </div>
          <div className="mb-4">
            <span className="font-bold">Timestamp:</span> {doctor.timeStamp}
          </div>
          <div className="mb-4">
            <span className="font-bold">Image:</span> 
            <img src={doctor.image} alt="Doctor" className="w-32 h-32" />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </>
  )
}

export default DocProfile
