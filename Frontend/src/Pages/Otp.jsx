import React from 'react'
import NavTopBar from '../components/home/NavTopBar'
import OtpVerification from '../components/OtpVerification'
import Footer from '../components/home/Footer'

function Otp({value}) {
  return (
<>
<NavTopBar/>
{value === 'doctor' ? (
        <OtpVerification value={'doctor'}  /> 
      ) : (
        <OtpVerification /> 
      )}
<Footer/>
</>
  )
}

export default Otp
