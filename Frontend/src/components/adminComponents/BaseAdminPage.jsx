import React from "react";
import AdminSideBar from "./AdminSideBar";
import Doctor from "./Doctor";
import Patients from './Patients'
import Department from './Department'
import useAuth from "../../context/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CreateDepartment from "./CreateDepartment";

function BaseAdminPage({ value }) {
  const navigate = useNavigate()
  const { admin} =useAuth()
  const adminToken = localStorage.getItem('adminToken')
  if(!adminToken){
    navigate("/admin-login");
    return null;
  }

  return (
    <>
      <div className=" max-w-screen h-screen flex flex-wrap ">
        <div className="w-full lg:w-1/5 text-center p-4 h-4/5">
          <AdminSideBar />
        </div>
        <div className="w-full lg:w-4/5 px-4 py-4  ">
          <div className="  border-4 rounded p-10 bg-slate-200">
            {value === 'dashboard' && <AdminDashboard/>}
            {value === "doctor" && <Doctor />}
            {value === "patient" && <Patients />}
            {value === "department" && <Department />}
            {value === "createDep" && <CreateDepartment/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default BaseAdminPage;
