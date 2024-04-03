import React from 'react'
import Search from './Search'
import ContactTopBar from './ContactTopBar'
import Footer from './Footer'
import MainBody from './MainBody'
import NavbarUser from '../userComponents/NavbarUser'


function Layout() {
  return (
    <div>
      <NavbarUser/>
      <ContactTopBar/>
      <MainBody/>
      <Footer/>
    </div>
  )
}

export default Layout
