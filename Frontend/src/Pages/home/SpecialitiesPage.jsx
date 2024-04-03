import React from 'react'
import Specialities from '../../components/home/Specialities'
import NavTopBar from '../../components/home/NavTopBar'
import Footer from '../../components/home/Footer'
import SpecialityCard from '../../components/SpecialityCard'
import NavbarUser from '../../components/userComponents/NavbarUser'

function SpecialitiesPage() {
  return (
<>
<NavbarUser/>
<SpecialityCard/>
<Footer/>
</>
  )
}

export default SpecialitiesPage
