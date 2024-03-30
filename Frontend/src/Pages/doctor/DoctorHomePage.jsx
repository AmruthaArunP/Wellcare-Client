import React from 'react'
import NavTopBar from '../../components/home/NavTopBar'
import Footer from '../../components/home/Footer'
import DoctorBasePage from './DoctorBasePage'

function DoctorHomePage({data}) {
  return (
    <>
        <NavTopBar />
        
        {data === 'home' && <DoctorBasePage value={'home'}/>}
        {data === 'docProfile' && <DoctorBasePage value={'docProfile'}/> }
        {data === 'docAppoinment' && <DoctorBasePage value={'docAppoinment'}/> }
        {data === 'docPatient' && <DoctorBasePage value={'docPatient'}/>}
        {data === 'docConsultation' && <DoctorBasePage value={'docConsultation'}/>}
        {data === 'docSchedule' && <DoctorBasePage value={'docSchedule'}/> }
        {data === 'addTimings' && <DoctorBasePage value={'addTimings'}/> }
        {data === 'docPriscription' && <DoctorBasePage value={'docPriscription'}/> }
        {data === 'docNewPriscription' && <DoctorBasePage value={'docNewPriscription'}/> }


                     
        <Footer/>
    </>
  )
}

export default DoctorHomePage
