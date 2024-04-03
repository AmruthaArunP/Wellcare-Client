import React, { useEffect, useState } from 'react'
import { useSocket } from '../../context/socket/socketProvider.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import { useSelector } from 'react-redux'



function DoctorHome() {

  const socket = useSocket();

  const [income, setIncome] = useState('')
  const [patients, setPatients] = useState('')
  const [docAppoint, setDocAppoint] = useState([])
  const [docId, setDocId] = useState(null);
  const navigate = useNavigate()
  const doctorToken = localStorage.getItem('doctorToken')


  useEffect(() => {
    console.log('effect is working');

    socket.on('user-requested', (user, roomId) => {
      
      console.log("DoctorHome ====>   room is",user,roomId);
      Swal.fire({
        title: 'Chat Request',
        text: `${user.userName} Requested a chat , Do you want to join ?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then((result) => {

        if (result.isConfirmed) {
          socket.emit('join-chat', roomId)
          console.log(user.userName);
          const handleRoomJoin = () => {
         
            navigate(`/doctor-chat/${user._id}`)
          }
          socket.on('chat-connected', handleRoomJoin);
        } else {
          socket.emit('doc-rejected', user._id)
        }
      });
    })
  },[socket])

  useEffect(() => {

    if (doctorToken) {

      const getSchedule = async () => {

        try {
          console.log(11);
        
          const response =  await doctorAxios.get('doctor/schedule-data')
          if (response.status === 200 && response.data.schedule.length > 0) {
            console.log("backend data : ******",response.data.schedule[0].doctor);
            setDocId(response.data.schedule[0].doctor);
            socket.emit('set-up', response.data.schedule[0].doctor)
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      getSchedule()
    }
  }, [doctorToken,socket])


  return (
    <>
    <h3>this id home page</h3>
    </>
  )
}

export default DoctorHome
