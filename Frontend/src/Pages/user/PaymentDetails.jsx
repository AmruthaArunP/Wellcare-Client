import React from 'react'
import Payment from '../../components/userComponents/Payment' 
import NavTopBar from '../../components/home/NavTopBar'
import Footer from '../../components/home/Footer'
import NavbarUser from '../../components/userComponents/NavbarUser'


function PaymentDetails() {
  return (
    <>
<NavbarUser/>
    <Payment/>
    <Footer />
    
    </>

  )
}

export default PaymentDetails
