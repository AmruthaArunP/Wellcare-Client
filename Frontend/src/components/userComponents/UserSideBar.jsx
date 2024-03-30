import React , { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiBuildings } from "react-icons/bi";
import { MdPerson } from "react-icons/md";
import { BsFileMedical } from "react-icons/bs";


function UserSideBar() {

    const navigate = useNavigate()


const handleProfile = useCallback(() => {
  navigate('/user-home-page');
},[navigate])

const handleAppoinments = useCallback(() => {
  navigate('/user-appoinment');
},[navigate])

const handlePrescription = useCallback(() => {
  navigate('/user-prescription')
},[navigate])



  return (
<>
<div className="h-full ">
        <div className="bg-zink-100  border rounded-lg shadow-lg h-full"  >
          <nav className="h-full mt-8 w-full ">
            <div className=" flex flex-col mx-4 md-mx-10  text-dark  ">
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500 " onClick={handleProfile}>
                  <MdPerson size={25} className="mr-4" /> My profile
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center">
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handleAppoinments}>
                  <BiBuildings size={25} className="mr-4" /> Appoinments
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" >
                <button className="rounded-lg btn flex items-center w-full border-4 p-2 bg-teal-500" onClick={handlePrescription}>
                  <BsFileMedical size={25} className="mr-4" /> Prescription
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
</>
  )
}

export default UserSideBar
