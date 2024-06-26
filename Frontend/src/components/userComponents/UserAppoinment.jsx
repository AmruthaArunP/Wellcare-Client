import React, {useCallback, useEffect, useState } from 'react'
import axios from '../../services/axiosInterceptor.js'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socket/socketProvider.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { addChatRoomId } from '../../redux/chatSlice.js';
import useAuth from '../../context/hooks/useAuth.js';

function UserAppoinment() {

  const [appointments, setAppointments] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [ chat,setChat] = useState(false);
  const userToken = localStorage.getItem('userToken')
  const socket = useSocket()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem('userEmail')
  console.log('email is:', email);
  const dispatch = useDispatch()
  const { setUser } = useAuth()


  const date = new Date();
  const formattedDate = format(date, 'dd-MM-yyyy');

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  console.log("appoinmtnts in appoinment page - after fetching:",appointments);

  // Pad minutes with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const currentTime = `${formattedHours}.${formattedMinutes} ${period}`;

  // Appoinment Cancel
  const handleCancelAppointment = useCallback(async (id) => {
    console.log("cancel app id is:", id);
    const response =await axios.post(`cancelAppoinment/${id}`, null)
    if(response.data === 'blocked'){
      history('/login')
      setUser(false);
      localStorage.removeItem('userToken')
    }else{
      const updatedArray = appointments.length != 0 && appointments.map((item) => {
        if (item._id === id) {
            console.log(1);
            return {
                ...item,
                isCancelled: true
            }
        }
        return item
    })
    console.log(updatedArray);
    setAppointments(updatedArray)
    }
  }, [appointments, userToken])


  useEffect(() => {
    socket.on("SentUpdatedMessage", (updatedMessage) => {
      console.log("updatedMessage", updatedMessage)
      setChat(true);
    });
  },[socket])


  useEffect(() => {
    
    const fetchAppoinments = async () =>{
        const response = await axios.get('userAppoinments', )
      if( response.data === 'blocked'){
        localStorage.removeItem('userToken')
        setUser(false);
        navigate('/login',{ state: { errorMsg: 'User is blocked' } })
        setErrorMsg('user is blocked')
      }else{
        console.log('appoinments:', response.data.appoinments);
        setAppointments(response.data.appoinments)
        console.log("userData for chat:", response.data.user);
        setUserData(response.data.user)
      }
    }
    fetchAppoinments();
  },[userToken])

  // Join meeting
  const handleJoin = useCallback((roomId) => {

    console.log('PATIENT: handleJoin -> roomId: ', roomId, ', email: ',email );

    const room = roomId
    console.log('PATIENT: handleJoin -> socket: ', socket );

    //socket.emit('socket:connect', { socketId: remoteSocketId });
    if(!socket.connected) {
        //socket.on('room:join', handleJoinRoom)

        socket.connect(roomId);
        if(!socket.connected) {
          socket.connect(roomId);
          console.log('PATIENT: handleJoin -> socket after connect on trial 2: ', socket );
        }
        else{
          console.log('PATIENT: handleJoin -> socket after connect on trial 1: ', socket );
        }
    }
    //socket.on('room:join', handleJoinRoom)
    socket.emit('room:join', { email, room });
}, [socket, email])

const handleJoinRoom = useCallback((data) => {
  console.log("PATIENT: handleJoinRoom => entered with data: ", data );  
  const room  = data.room
  //console.log('handleJoinRoom before navigate' );
  // navigate(`/call/${room}`)
  navigate(`/user-call/${room}`)
}, [navigate])

useEffect(() => {
  console.log('PATIENT: useEffect =>  before calling room:join with handleJoinRoom' );
  socket.on('room:join', handleJoinRoom)

  return () => {
      console.log('PATIENT: useEffect => useEffect return called. room:join : socket.off' );
      socket.off('room:join', handleJoinRoom)
  }
}, [socket, handleJoinRoom])


//chat

const handleChat = (appoinmentId, docterId) => {
  // dispatch(addChatRoomId(appoinmentId))
  const appmtId = appoinmentId;
  const docId = docterId;
  navigate('/chat', { state : { appmtId, docId}})
}

// const handleChat = (roomId, docterId) => {

//   if (userData && appointments && docterId) {
//     socket.emit('setup', userData);
//     socket.emit('join-chat', roomId, userData, docterId);

//     const handleRoomJoin = () => {
//       dispatch(addChatRoomId(roomId))
//       navigate(`/chat/${docterId}`)
//     }

//     socket.on('chat-connected', handleRoomJoin);

//     return () => {
//       socket.off('chat-connected', handleRoomJoin);
//     }
//   }
// }



  return (
    <>
      <div className="appoints text-center p-3 m-5 border rounded-lg shadow-lg ">
        <h2 className="text-center text-4xl text-teal-600 font-bold mb-4 underline">Appointments</h2><br/>
              {appointments ? (appointments.length !== 0 ? (
          appointments.map(el => (
            <div key={el._id} className="appointCard text-center border rounded-lg shadow-lg  mx-4 my-4 p-4 bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div className="col-span-1 md:text-left">
                  <h4 className="font-bold">{el.docData[0].name}</h4>
                  <p className="text-sm">Qualification: {el.docData[0].qualification}</p>
                  <p className="text-sm">Gender: {el.docData[0].gender}</p>
                  <p className="text-sm">Fees: {el.docData[0].fee}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm">Date: {el.date}</p>
                  <p className="text-sm">Time: {el.time}</p>
                </div>

              </div>
              <div className="col-span-1">
                  {formattedDate >= el.date && el.time < currentTime ? (
                    <p className="text-sm text-red-500">Expired</p>
                  ) : el.isAttended ? (
                    <p className="text-sm">Attended</p>
                  ) : !el.isCancelled ? (
                    <>
                      <button  className="btn bg-red-500 text-white px-3 py-1 text-sm rounded-md mr-2" onClick={() => handleCancelAppointment(el._id)}>Cancel</button>
                      <button  className="btn bg-green-500 text-white px-3 py-1 text-sm rounded-md mr-2" onClick={()=> handleJoin(el._id + el.user)}>Join</button>
                      <button className="btn bg-green-500 text-white px-3 py-1 text-sm rounded-md" onClick={() => handleChat(el._id ,el.doctor)}>Chat {chat && <span className="text-white bg-red-600  border rounded">1</span>}</button>
                    </>
                  ) : (
                    <p className="text-sm text-red-500">Cancelled</p>
                  )}
                </div>
            </div>
            
          ))
        ) : (
          <p>No appointments found.</p>
        )) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default UserAppoinment
