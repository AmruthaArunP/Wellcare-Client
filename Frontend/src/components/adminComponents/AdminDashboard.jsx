import React from 'react'
import { FaIdCard } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import BarChart from '../BarChart';
import adminAxios from '../../services/adminAxiosInterceptor.js'


function AdminDashboard() {

    const [appointments, setAppointments] = useState([])
    const [income, setIncome] = useState('')
    const [patients, setPatients] = useState('')
    const adminToken = localStorage.getItem('adminToken')

    useEffect(()=> {
        const dataCall = async () => {
            const response = await adminAxios.get('admin/income')
            if(response.data){
                console.log("response in admin dashboard:",response.data);
                setAppointments(response.data)
                const inc = response.data.reduce((acc, occ) => {
                    return acc = acc + occ.amount
                  }, 0)
                  setIncome(inc)
                  setPatients(response.data.length)
            }
        }
        dataCall()
    },[adminToken])



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

<BarChart appoints={appointments} />
        {/* <div style={{paddingLeft:'40px'}}> Download Sales Report <DownloadButton patients={patients.toString()} income={income.toString()} Appointment={docAppoint} /></div> */}

    </div>

    </>
  )
}

export default AdminDashboard
