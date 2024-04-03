import React from 'react'
import NavTopBar from '../../components/home/NavTopBar'
import DoctorsWithSpeciality from '../../components/DoctorsWithSpeciality'
import Footer from '../../components/home/Footer'
import NavbarUser from '../../components/userComponents/NavbarUser'

function DoctorsInSpecialityPage() {
  return (
    <>
    <NavbarUser/>
    <DoctorsWithSpeciality/>
    <Footer/>
    </>


  )
}

export default DoctorsInSpecialityPage
