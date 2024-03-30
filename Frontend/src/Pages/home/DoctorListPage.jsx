import React, { useEffect, useState } from 'react'
import NavTopBar from '../../components/home/NavTopBar'
import DoctorsCard from '../../components/DoctorsCard'
import Footer from '../../components/home/Footer'
import Search from '../../components/home/Search'



function DoctorListPage() {
  return (
    <>
    <NavTopBar/>
    <DoctorsCard/>
    <Footer/> 
    </>

  )
}

export default DoctorListPage
