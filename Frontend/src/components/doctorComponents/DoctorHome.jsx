import React, { useState ,useEffect } from 'react'
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import { useNavigate } from 'react-router-dom';
import BarChart from '../BarChart.jsx';
import { BiRupee } from "react-icons/bi"
import { FaIdCard } from "react-icons/fa"



function DoctorHome() {

  const [income,setIncome ] = useState('');
  const [patients, setPatients] = useState('')
  const doctorToken = localStorage.getItem('doctorToken')
  const [docAppoint, setDocAppoint] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    try {
      const dataCall = async () => {
        const response = await doctorAxios.get('doctor/dashboard')
        if(response.data){
          console.log("response getting in dash board:",response.data);
          setDocAppoint(response.data)
          const inc = response.data.reduce((acc, occ) => {
            return acc = acc + occ.amount
          }, 0)
          console.log("doctor income:",inc);
          setIncome(inc)
          setPatients(response.data.length)
        }
      }
      dataCall()
    } catch (error) {
      console.log("error in dashboard:",error);
    }
  },[doctorToken])


  return (
    <>
    <div>
    <div className="flex flex-wrap justify-center">
    <div className="w-full lg:w-1/2">
        <div className="dataButton m-4 border shadow-lg p-4 ">
            <h5 className="flex items-center text-2xl font-bold text-teal-500"><BiRupee className="mr-2 " /> Total Income</h5>
            <h4 className='text-2xl font-bold text-teal-500'>{income && income}</h4>
        </div>
    </div>
    <div className="w-full lg:w-1/2">
        <div className="dataButton m-4 border shadow-lg p-4">
            <h5 className="flex items-center text-2xl font-bold text-teal-500"><FaIdCard className="mr-2" /> Total appointments</h5>
            <h4 className='text-2xl font-bold text-teal-500'>{patients && patients}</h4>
        </div>
    </div>
</div>

<BarChart appoints={docAppoint} />
        {/* <div style={{paddingLeft:'40px'}}> Download Sales Report <DownloadButton patients={patients.toString()} income={income.toString()} Appointment={docAppoint} /></div> */}

    </div>

    </>

  )
}

export default DoctorHome
