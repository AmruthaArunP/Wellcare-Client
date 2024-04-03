import React from 'react'
import Footer from '../../components/home/Footer'
import UserBasePage from './UserBasePage'
import NavbarUser from '../../components/userComponents/NavbarUser'

function UserHomePage({data}) {
  return (
<>
<div className=' '>
<NavbarUser/>
        {data === 'userProfile' && <UserBasePage value={'userProfile'}/> }
        {data === 'userAppoinment' && <UserBasePage value={'userAppoinment'}/> }
        {data === 'userPrescription' && <UserBasePage value={'userPrescription'}/>}
<Footer/>

</div>

</>
  )
}

export default UserHomePage
