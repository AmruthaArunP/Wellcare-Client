import React, { useCallback } from 'react'
import { FaStethoscope } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { MdPerson, MdOutlineSick } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsCashCoin, BsFileMedical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


function DoctorSideBar() {

const navigate = useNavigate()

const handleDashboard = useCallback(() => {
  navigate('/doctor-home-page')
},[navigate])

const handleProfile = useCallback(() => {
  navigate('/doctor-profile');
},[navigate])

const handleChat = useCallback(() => {
  navigate('/doctor-chat');
},[navigate])

const handleAppoinments = useCallback(() => {
  navigate('/doctor-appoinment');
},[navigate])

const handlePatients = useCallback(() => {
  navigate('/doctor-patients-data')
},[navigate])

const handleConsultation = useCallback(() => {
  navigate('/doctor-consultation')
},[navigate])

const handleShedule = useCallback(() => {
  navigate('/doctor-timeSchedule')
},[navigate])

const handlePrescription = useCallback(() => {
  navigate('/doctor-prscription')
},[navigate])

  return (
    <>
      <div className="h-full ">
        <div className="bg-zink-100  border rounded-lg shadow-lg h-full bg-gray-100"  >
          <nav className="h-full mt-8 w-full ">
            <div className=" flex flex-col mx-4 md-mx-10  text-dark  ">
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handleDashboard}>
                  <RxDashboard size={25} className="mr-4" /> Dashboard
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500 " onClick={handleProfile}>
                  <MdPerson size={25} className="mr-4" /> My profile
                </button>
              </div>
              {/* <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500 " onClick={handleChat}>
                  <MdPerson size={25} className="mr-4" /> Chat
                </button>
              </div> */}
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handleShedule}>
                  <BiBuildings size={25} className="mr-4" /> My Schedule
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center">
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handleAppoinments}>
                  <BiBuildings size={25} className="mr-4" /> Appoinments
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handleConsultation}>
                  <BsFileMedical size={25} className="mr-4" /> Consultation
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handlePatients}>
                  <MdOutlineSick size={25} className="mr-4" /> Patients
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handlePrescription}>
                  <MdOutlineSick size={25} className="mr-4" /> Prescription

                </button>
              </div>



            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default DoctorSideBar
