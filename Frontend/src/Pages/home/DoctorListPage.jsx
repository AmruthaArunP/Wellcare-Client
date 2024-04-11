import React, { useEffect, useState } from 'react'
import DoctorsCard from '../../components/DoctorsCard'
import Footer from '../../components/home/Footer'
import NavbarUser from '../../components/userComponents/NavbarUser'




function DoctorListPage() {
  return (
    <>
    <NavbarUser/>
    <DoctorsCard/>
    <Footer/> 
    </>

  )
}

export default DoctorListPage
