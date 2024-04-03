import React, {useCallback} from "react";
import { FaStethoscope } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { MdPerson, MdOutlineSick } from "react-icons/md";
import { BsCashCoin, BsFileMedical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const AdminSideBar = () => {

    const navigate = useNavigate();

    const handleDashboard = useCallback(() =>{
        navigate('/admin-homePage')
    },[navigate])

    const handleDoctor = useCallback(() => {
        navigate('/admin-doctors-details')
    },[navigate])

    const handlePatient = useCallback(()=>{
        navigate('/admin-patient-details')
    },[navigate])

    const handleDepartment = useCallback(() => {
        navigate('/department-details')
    },[navigate])


  return (
    <>
      <div className="h-full ">
        <div className="bg-slate-200  border rounded h-full"  >
          <nav className="h-full mt-8 w-full ">
            <div className=" flex flex-col mx-4 md-mx-10  text-dark  ">
              <div className="text-xl buttons py-4 flex items-center" onClick={handleDashboard}>
                <button className="btn flex items-center w-full border-4 p-2 bg-blue-300 rounded">
                  <MdPerson size={25} className="mr-4" /> Dashboard
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" onClick={handleDoctor}>
                <button className="btn flex items-center w-full border-4 p-2 bg-blue-300 rounded ">
                  <FaStethoscope size={25} className="mr-4" /> Doctors
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" onClick={handlePatient}>
                <button className="btn flex items-center w-full border-4 p-2 bg-blue-300">
                  <MdOutlineSick size={25} className="mr-4" /> Patients
                </button>
              </div>
              <div className="text-xl buttons py-4 flex items-center" onClick={handleDepartment}>
                <button className="btn flex items-center w-full border-4 p-2 bg-blue-300">
                  <BiBuildings size={25} className="mr-4" /> Department
                </button>
              </div>

            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
