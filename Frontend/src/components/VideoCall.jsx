import React, { useEffect, useCallback,useRef, useState } from 'react'
import { useSocket } from '../context/socket/socketProvider'
import ReactPlayer from 'react-player'
import peer from '../services/peer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsFillTelephoneFill, BsFillTelephoneXFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import PropTypes from 'prop-types'
import axios from '../services/axiosInterceptor.js'


function VideoCall({value}) {

    const socket = useSocket()
    const navigate = useNavigate()
    const remoteRef = useRef()
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [callActive, setCallActive] = useState(false)
    const [myStream, setMyStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState()
    const [muted, setMuted] = useState(true)
    const [accepted, setAccepted] = useState(false)
    const docToken = localStorage.getItem('doctorToken')
    const appoint = useSelector(state => state.consult.slot)


    const handleUserJoined = useCallback(({ email, id }) => {
      console.log(`${email} joined`);
      setRemoteSocketId(id)
    }, [])

      const handleCallUser = useCallback(async () => {
        console.log("handleCallUser -> call active value in user:", callActive);
        if (callActive) {
        console.log("handleCallUser -> call active Entered");
        myStream.getTracks().forEach((track) => track.stop());
          setMyStream(null);
          socket.emit('call:end', { to: remoteSocketId })
          setCallActive(false)
          setRemoteStream('')
          if(value === 'doctor'){
            console.log("handleCallUser -> slot:",appoint);
            console.log("handleCallUser -> docToken:",docToken);
              if (appoint) {
                console.log("token before sending to back :",docToken);
                await axios.patch(`doctor/doctorEndAppointment/${appoint}`,{}, {
                  headers: {
                    Authorization: `Bearer ${docToken}`
                  }
                }).then(res => {
                  console.log(res.data);
                })
              }
          }


          console.log("handleCallUser -> remoteSocketId:", remoteSocketId);
          console.log("handleCallUser -> socket:", socket);


          socket.emit('socket:disconnect', { socketId: remoteSocketId });

          
          if (value === 'doctor') {
            navigate('/doctor-success')
          } else if (value === "user") {
            navigate('/feedback')
          }
    
        } else {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          const offer = await peer.getOffer()
          socket.emit('user:call', { to: remoteSocketId, offer })
          setMyStream(stream)
          setCallActive(true)
        }
      }, [appoint, callActive, docToken, myStream, navigate, remoteSocketId, socket, value])

      const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from)
        setCallActive(true)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMyStream(stream)
        const ans = await peer.getAnswer(offer)
        socket.emit('call:accepted', { to: from, ans })
      }, [socket])

      const sendStreams = useCallback(() => {
        setAccepted(true)
        for (const track of myStream.getTracks()) {
          peer.peer.addTrack(track, myStream);
        }
        setCallActive(true)
      }, [myStream]);
    
    
    
      const handleCallAccepted = useCallback(
        async ({ ans }) => {
          await peer.setLocalDescription(ans);
          console.log("Call Accepted!");
          setCallActive(true)
          sendStreams()
        },
        [sendStreams]
      );

      const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer()
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
      }, [remoteSocketId, socket])
    
      const handleNegoIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer)
    
        socket.emit('peer:nego:done', { to: from, ans })
      }, [socket])
    
    
      const handleNegoFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans)
      }, [])
    
      const handleMute = useCallback(() => {
        setMuted(!muted)
      }, [muted])

      
      useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
        return () => {
          peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
        }
      }, [handleNegoNeeded])


      useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
          const remoteStream = ev.streams
          setRemoteStream(remoteStream[0])
        })
      }, [])

    useEffect(()=>{
        socket.on('user:joined', handleUserJoined)
        socket.on('incoming:call', handleIncomingCall)
        socket.on('call:accepted', handleCallAccepted)
        socket.on('peer:nego:needed', handleNegoIncoming)
        socket.on('peer:nego:final', handleNegoFinal)

        return () => {
            socket.off('user:joined', handleUserJoined)
            socket.off('incoming:call', handleIncomingCall)
            socket.off('call:accepted', handleCallAccepted)
            socket.off('peer:nego:needed', handleNegoIncoming)
            socket.off('peer:nego:final', handleNegoFinal)
      
          }
    },[socket, handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted])

  return (
<>
<div className="bg-teal-200  text-center py-3 px-8 m-8  border rounded-lg shadow-lg">
  <h3 className="text-center text-4xl text-teal-600 font-bold mb-4 ">CONSULTING STATION</h3>
  {value === 'user' ? (!remoteSocketId && <p className="mt-4">Please wait until the call arrives</p>) : (
    !callActive && <h5 className="mt-4">{remoteSocketId ? 'Patient online' : 'No one in the room'}</h5>)
  }
  <div className="container mx-auto mt-8">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start  mt-4 px-8">
      <div className="col-md-6  text-center ">
        {myStream && <h2 className="text-2xl font-bold mb-2 text-teal-600">My stream</h2>}
        {myStream && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted width={'100%'} height={'80%'} />}
      </div>
      <div className="col-md-6  text-center">
        {remoteStream && <h2 className="text-2xl font-bold mb-2 text-teal-600">Remote stream</h2>}
        {remoteStream && <ReactPlayer style={{ backgroundColor: 'black' }} ref={remoteRef} url={remoteStream} playing muted={muted} width={'100%'} height={'80%'} />}
      </div>
    </div>

    <br />
    {callActive && (
      <button className='btn bg-red-500 text-white mt-4 border-2 px-4 py-2 rounded ' onClick={handleCallUser}>Cancel call</button>
    )}
    {myStream && (
      <button className={`${!muted ? 'bg-green-600 mt-4 border-2 px-2 py-2 rounded' : 'btn-dark border-2 px-2 py-2 rounded'} mt-4 ms-3`} onClick={handleMute}>
        {muted ? <BsMicMuteFill /> : <BsMicFill />}
      </button>
    )}

    {value === 'user' && myStream && (
      <button className={accepted ? 'hidden' : 'btn bg-green-600 text-white mt-4 border-2 px-8 py-2 rounded'} onClick={sendStreams}>
        Call
      </button>
    )}
    {!callActive && value === 'doctor' && remoteSocketId && (
      <button className='btn btn-outline-success mt-4' onClick={handleCallUser}>Call</button>
    )}
  </div>
</div>

</>

  )
}

export default VideoCall
