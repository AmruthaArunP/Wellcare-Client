import React from 'react'
import NavTopBar from '../../components/home/NavTopBar'
import Footer from '../../components/home/Footer'
import UserBasePage from './UserBasePage'

function UserHomePage({data}) {
  return (
<>
<div className=' '>
<NavTopBar/>
        {data === 'userProfile' && <UserBasePage value={'userProfile'}/> }
        {data === 'userAppoinment' && <UserBasePage value={'userAppoinment'}/> }
        {data === 'userPrescription' && <UserBasePage value={'userPrescription'}/>}
<Footer/>

</div>

</>
  )
}

export default UserHomePage
