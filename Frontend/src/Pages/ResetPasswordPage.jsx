import React from 'react'
import NavTopBar from '../components/home/NavTopBar'
import ResetPassword from '../components/ResetPassword'
import Footer from '../components/home/Footer'

function ResetPasswordPage({value}) {
  return (
    <>
         {value === 'doctor' ? (
      <NavTopBar value={'doctor'}/>

      ): (
        <NavTopBar value = {'user'}/>

      )}
    {value === 'doctor' ? (
        <ResetPassword value = {'doctor'}/>
    ) : (
        <ResetPassword/>
    )}
    
    <Footer/>
    </>

  )
}

export default ResetPasswordPage
