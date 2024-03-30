import React , { useEffect, useState } from 'react'
import './chat.css'

import axios from '../../services/axiosInterceptor.js'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/socket/socketProvider.jsx';

function Chat({user}) {

    const navigate = useNavigate()
    const [message, setMessage] = useState();
    const [chatHistory, setChatHistory] = useState([]);
    const url = new URL(window.location.href);
    const chatId = url.pathname.split('/').pop();
    const socket = useSocket();
    const selecter = useSelector((state) => state.chatRoomId);

    const [docData, setDocData] = useState([]);
    const [usrData, setUsrData] = useState([]);

    console.log("chat dr id is:******",chatId);

    const SendMessage = () => {
        if (message && message.trim().length > 0) {
            socket.emit('send-message', message, chatId);
            setChatHistory([...chatHistory, { send: true, message: message }]);
            setMessage('');
        } else {
            Swal.fire({
                title: 'Empty Message',
                text: 'Please enter a message before sending.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    useEffect(() => {
        if (selecter) {
            
            findUserAndDoctor()
        }
    }, [selecter])

    var chatdoc
    if(user=='doctor')
    {
        chatdoc=useParams()
    }


    const findUserAndDoctor = async () => {
        try {
            const chatId = selecter.chatRoomId
            if (user === 'user') {
                console.log(49);
                const token = localStorage.getItem('userToken');
                // const axiosInstance = createInstance(token)
                // const response = await axiosInstance.get(`booking/load-user-chatess/${chatId}`)
                const response = await axios.get( `load-user-chatess/${chatId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })

                
               console.log(50);
                if (response.status === 200) {
                   
                    setDocData(response.data.doctor)

                }
            } else if (user === 'doctor') {
                console.log(chatdoc.chatId,122);
                const chatId=chatdoc.chatId
                console.log(chatId,133);
                const doctortoken = localStorage.getItem('doctorToken');
                // const axiosInstance = createInstance(doctortoken);
                // const response = await axiosInstance.get(`booking/load-doc-chatess/${chatId}`)
                console.log("dr token in chat *******",doctortoken);
                const response = await axios.get( `doctor/load-doc-chatess/${chatId}`, {
                    headers: {
                      Authorization: `Bearer ${doctortoken}`
                    }
                  })

             
                
                if (response.status === 200) {
                    console.log(55);
                    console.log(response.data);
                    setUsrData(response.data.user)
                    

                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {

        socket.on('doctor-joined', (user) => {
            console.log(`Doctor ${user.name} joined the chat`);
        });

        socket.on('recieved-message', (message) => {
            // console.log(message, 'front-end');
            setChatHistory([...chatHistory, { send: false, message: message }]);
        })

        socket.on('chat-rejected', () => {

            Swal.fire({
                title: 'Chat Rejected',
                text: "Doctor is not available to chat with you. Please try again later.",
                icon: 'error',
                confirmButtonText: 'OK',
            }).then(() => {
                closeChat();
            });
        });

        return () => {
            socket.off('recieved-message');
            socket.off('chat-rejected');
        };

    }, [socket.connected, chatHistory]);

    const closeChat = () => {
        socket.emit('leave-chat', selecter.chatRoomId);
        navigate(user === 'user' ? '/user-appoinment' : '/doctor-home-page');
    }

  return (
<>
{docData.name || usrData.userName ? ( // Check if doctor's name or user's name is available
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-xl">
            {user === 'user' ? (
              <div className="user-info">
                <div className="user-avatar">
                  {/* <img src={`images/${docData.image}`} alt={docData.name} className="w-12 h-12 rounded-full" /> */}
                </div>
                <div className="chat-head-txt">{docData.name ? docData.name : 'Loading'}</div>
              </div>
            ) : (
              <div className="user-info">
                <div className="user-avatar">
                  {/* <img src={usrData.image?usrData.image:usrData.picture} alt={usrData.name} className="w-12 h-12 rounded-full" /> */}
                </div>
                <div className="chat-head-txt">{usrData.userName ? usrData.userName : 'Loading'}</div>
              </div>
            )}
          </div>
          <button className="chat-end-butt" onClick={closeChat}>Close</button>
        </div>
        <div className="chat-body" style={{ minHeight: '40vh' }}>
          {chatHistory.map((e, index) => {
            const isOutgoing = !e.send;
            return (
              <div className={`message ${isOutgoing ? 'outgoing' : 'incoming'}`} key={index}>
                <div className="message-content">
                  <p>{e.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat-footer mt-4">
          <input onChange={(e) => { setMessage(e.target.value) }} className="border border-gray-300 rounded-md p-2 w-full" placeholder="Type your message" value={message} type="text" />
          <button className="chat-send-button ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={SendMessage}>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
) : (
  <div>Loading...</div>
)}
</>

  )
}

export default Chat
