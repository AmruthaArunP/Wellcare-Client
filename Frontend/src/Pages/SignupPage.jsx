import React from 'react'
import NavTopBar from '../components/home/NavTopBar'
import Signup from '../components/Signup'
import Footer from '../components/home/Footer'


function SignupPage({value}) {
  return (
    <div>
      <NavTopBar/>
      {value === 'doctor' ? (
        <Signup value={'doctor'}  /> 
      ) : (
        <Signup /> 
      )}
          
      <Footer/>
    </div>
  )
}

export default SignupPage
