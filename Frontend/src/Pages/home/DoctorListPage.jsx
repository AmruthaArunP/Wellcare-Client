import React, { useEffect, useState } from 'react'
import NavTopBar from '../../components/home/NavTopBar'
import DoctorsCard from '../../components/DoctorsCard'
import Footer from '../../components/home/Footer'
import Search from '../../components/home/Search'
import NavbarUser from '../../components/userComponents/NavbarUser'
import DoctorsCardNew from '../../components/DoctorsCardNew'
import DoctorsCardNewDouble from '../../components/DoctorsCardNewDouble'



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
