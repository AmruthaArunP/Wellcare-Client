import React, { useEffect } from "react";
import Footer from "../../components/home/Footer";
import DoctorBasePage from "./DoctorBasePage";
import NavbarDoctor from "../../components/doctorComponents/NavbarDoctor";

function DoctorHomePage({ data }) {
  return (
    <>
      <div className="">
        <NavbarDoctor />
        <div className="">
          <div className="p-4 md:p-8">
               {data === 'home' && <DoctorBasePage value={'home'}/>}
                {data === 'docProfile' && <DoctorBasePage value={'docProfile'}/> }
                {data === 'docAppoinment' && <DoctorBasePage value={'docAppoinment'}/> }
                {data === 'docPatient' && <DoctorBasePage value={'docPatient'}/>}
                {data === 'docConsultation' && <DoctorBasePage value={'docConsultation'}/>}
                {data === 'docSchedule' && <DoctorBasePage value={'docSchedule'}/> }
                {data === 'addTimings' && <DoctorBasePage value={'addTimings'}/> }
                {data === 'docPriscription' && <DoctorBasePage value={'docPriscription'}/> }
                {data === 'docNewPriscription' && <DoctorBasePage value={'docNewPriscription'}/> }
                {/* {data === 'chat' && <DoctorBasePage value={'chat'}/>} */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DoctorHomePage;
