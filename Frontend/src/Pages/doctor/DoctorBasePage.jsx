import React, { useEffect } from "react";
import DoctorSideBar from "../../components/doctorComponents/DoctorSideBar";
import DocProfile from "../../components/doctorComponents/DocProfile";
import DocAppoinment from "../../components/doctorComponents/DocAppoinment";
import DocPatient from "../../components/doctorComponents/DocPatient";
import DocSchedule from "../../components/doctorComponents/DocSchedule";
import Addshedule from "../../components/doctorComponents/Addshedule";
import DocConsultation from "../../components/doctorComponents/DocConsultation";
import DocPrescription from "../../components/doctorComponents/DocPrescription";
import DoctorHome from "../../components/doctorComponents/DoctorHome";
import CreatePrescription from "../../components/doctorComponents/CreatePrescription";
import { useNavigate } from "react-router-dom";
import ChatPage from "../ChatPage";

function DoctorBasePage({ value }) {
  return (
    <>
      <div className=" max-w-screen flex flex-wrap flex-row  ">
        <div className="w-full lg:w-1/5 text-center p-4 h-4/5">
          <DoctorSideBar />
        </div>
        <div className="w-full lg:w-4/5 px-4 py-4 flex flex-col">
          <div className="flex-grow border rounded-lg shadow-lg p-10 overflow-y-auto">
              {value === 'home' && <DoctorHome />}
              {value === 'docProfile' && <DocProfile/> }
              {value === 'docAppoinment' && <DocAppoinment/> }
              {value === 'docPatient' && <DocPatient/>}
              {value === 'docConsultation' && <DocConsultation/> }
              {value === 'docSchedule' && <DocSchedule/>}
              {value === 'addTimings' && <Addshedule/>}
              {value === 'docPriscription' && <DocPrescription/>}
              {value === 'docNewPriscription' && <CreatePrescription/>}
              {/* {value === 'chat' && <ChatPage user={'doctor'} />} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorBasePage;
