//user chat
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { Picker } from 'emoji-mart';
// import "emoji-mart/dist/emoji-mart.css";
// import socketIO from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import Sidebar from './Sidebar';
// const socket = socketIO.connect('http://localhost:5000');

const Chat = () => {

  const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth);
    console.log("userInfo", userInfo)
    const socket = io('http://localhost:5000');

    const handleMessage = (e) => {
      e.preventDefault();
      console.log('Message:', message);
      setMessage('');
      socket.emit('chat-message', { msg: message, userInfo: userInfo });
    };

    const handleEmojiSelect = (event, emojiObject) => {
      console.log(emojiObject);
      console.log(event);
      setMessage(message + event.emoji); // Append selected emoji to message
  };

      useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat([...chat, payload]);
        });
    });

    const handleFileChange = (e) => {
      console.log(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    };

    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     socket.on('messageResponse', (data) => setMessages([...messages, data]));
    //   }, [socket, messages]);

    //   console.log(messages);

    // const handleSendMessage = (e) => {
    //     e.preventDefault();
    //     if (message.trim() && localStorage.getItem('userName')) {
    //       socket.emit('message', {
    //         text: message,
    //         // name: localStorage.getItem('userName'),
    //         id: ${socket.id}${Math.random()},
    //         socketID: socket.id,
    //       });
    //     }
    //     console.log(message);
    //     setMessage('');
    //   };

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <Sidebar />
    <div className='w-100 bg-dark justify-content-center align-items-center p-2 rounded chatarea-container'>
        {/* <div className='chat-header'>chat header</div> */}
        <div className='chat-area'>
        <ul id="messages">
                    {chat.map((payload, index) => {
                        const isSentByCurrentUser = payload.sender.name === userInfo.name;
                        const messageClass = isSentByCurrentUser ? 'sent-message' : 'received-message';

                        return (
                            <p
                                key={index}
                                className={message-container ${messageClass}}
                            >
                                {payload.msg}
                            </p>
                        );
                    })}


                </ul>
        </div>
        <div className='chat-input'>
        <form className="form" onSubmit={handleMessage}>
        {/* <div className="file-input-container">
              {/* <label htmlFor="file-upload"> */}
                {/* <FontAwesomeIcon icon={faImage} className="fa-lg me-3 fa-fw" /> */}
              {/* </label> */}
              {/* <input type="file" id="file-upload" onChange={handleFileChange} /> */}
              {/* <label htmlFor="video-upload"> */}
                {/* <FontAwesomeIcon icon={faVideo} className="fa-lg me-3 fa-fw" /> */}
              {/* </label> */}
              {/* <input type="file" id="video-upload" onChange={handleFileChange} accept="video/*" />
            </div>  */}
            <input 
            id="input"
            placeholder='type a message' 
            className='search-box' 
            type="text" 
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            {/* Button to toggle emoji picker */}
            <button type='button' className='border-0' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <FontAwesomeIcon icon={faSmile} className="fa-lg me-3 fa-fw" />
                    </button>
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    )}
                    {/* <EmojiPicker /> */}
            <button type='submit' className='border-0'><FontAwesomeIcon icon={faPaperPlane} className="fa-lg me-3 fa-fw" /></button>
        </form>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default Chat;

//driver chat

import React, { useState, useEffect } from 'react'
import DriverNavbar from './DriverNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import DriverSidebar from './DriverSidebar';
import './DriverChat.css';

const DriverChat = () => {

    // const { userInfo } = useSelector((state) => state.auth);
    // console.log("userInfo", userInfo);

    const { driverInfo } = useSelector((state) => state.driver);
    console.log("driverInfo", driverInfo);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const navigate = useNavigate();
    const socket = io('http://localhost:5000');

    const handleMessage = (e) => {
        e.preventDefault();
        console.log('Message:', message);
        setMessage('');
        socket.emit('chat-message', { msg: message, userInfo: driverInfo });
    };


    const handleEmojiSelect = (event, emojiObject) => {
        console.log(emojiObject);
        console.log(event);
        setMessage(message + event.emoji); // Append selected emoji to message
    };


    useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat([...chat, payload]);
        });
    });
    
  return (
    <>
    <DriverNavbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />

    <div className='w-100 bg-dark justify-content-center align-items-center p-2 rounded chatarea-container'>
        {/* <div className='chat-header'>chat header</div> */}
        <div className='chat-area'>
        <ul id="messages">
                    {chat.map((payload, index) => {
                        const isSentByCurrentUser = payload.sender.name === driverInfo.name;
                        const messageClass = isSentByCurrentUser ? 'sent-message' : 'received-message';

                        return (
                            <p
                                key={index}
                                className={message-container ${messageClass}}
                            >
                                {payload.msg}
                            </p>
                        );
                    })}


                </ul>
        </div>
        <div className='chat-input'>
        <form className="form" onSubmit={handleMessage}>
            <input 
            id="input"
            placeholder='type a message' 
            className='search-box' 
            type="text" 
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
             {/* Button to toggle emoji picker */}
             <button type='button' className='border-0' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <FontAwesomeIcon icon={faSmile} className="fa-lg me-3 fa-fw" />
                    </button>
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    )}
            <button type='submit' className='border-0'><FontAwesomeIcon icon={faPaperPlane} className="fa-lg me-3 fa-fw" /></button>
        </form>
        </div>
        
    </div>
    </div>
    </>
    
  )
}

export default DriverChat;


//server

import express from 'express';
import dotenv from 'dotenv';    
import cors from 'cors';  
dotenv.config();   
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRoutes from './routes/chatRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import http from 'http';
import { Server } from "socket.io";
// import { Server as SocketIOServer } from 'socket.io';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const port = process.env.PORT || 5000;   
   

connectDB();
const app = express();

// const http = new Server(app);
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true, // if you need to send cookies or authentication headers
  }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
app.use('/', express.static(path.join(__dirname,'uploads')));


// const io = new SocketIOServer(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

// //Add this before the app.get() block
// io.on('connection', (socket) => {
//     console.log(⚡: ${socket.id} user just connected!);
//     //Listens and logs the message to the console
//     socket.on('message', (data) => {
//         io.emit('messageResponse', data);
//       });

//     socket.on('disconnect', () => {
//       console.log('🔥: A user disconnected');
//     });
// });


app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);


app.get('/', (req, res) => {
    res.send("Server is up and running.");
})

app.use(notFound);
app.use(errorHandler);  

const users= new Set();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    users.add(socket.id)
    io.emit('userCount',users.size);
    socket.on('chat-message', (data) => {
        const {msg,userInfo}=data
        console.log('from:',socket.id+'  message:', msg+' userInfo:',userInfo);
        io.emit('chat-message', { msg: msg, sender: userInfo, receiver: null });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        users.delete(socket.id)
        io.emit('userCount',users.size)
    });
});

server.on("error", (err) => {
    console.log("Error opening server:", err);
});

server.listen(port, () => {
    console.log([server] Listening on http://localhost:${port});
})


import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './RideDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRideDetailMutation } from '../../Slices/userApiSlice';
import { clearRideCredentials } from '../../Slices/rideSlice';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

const RideDetails = () => {

    const [rideHistory,setRideHistory] = useState([]);

    const mapContainerRef = useRef(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { rideInfo } = useSelector((state)=>state.ride);
    const { userInfo } = useSelector((state)=>state.auth);
    const { startplaceCord } = useSelector((state)=>state.place);
    const { destplaceCord } = useSelector((state)=>state.place);
    const rideUser = userInfo?.name;
    const [getRideDetails, {isError, refetch}] = useGetRideDetailMutation();

    useEffect(() => {
        const getRides = async () => {
            const rides = await getRideDetails({rideUser}).unwrap();
            console.log(rides);
            setRideHistory(rides);
            dispatch(clearRideCredentials())
        }
        getRides();
    }, [])

   useEffect(() => {

    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

    const mapboxToken = 'pk.eyJ1IjoidW5uaWtyaXNobmFuODA3NSIsImEiOiJjbHRpZTlmcXAwYWpkMmtxd2JwOXJveXAyIn0.IOfM5FIc6EnW86dMN3-DyA';

    console.log(startplaceCord[0],startplaceCord[1]);

    const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [startplaceCord[0], startplaceCord[1]], // Source location
        zoom: 12,
    });

    map.on('load', () => {
      setMapInitialized(true);
  });

    if (mapInitialized) {
      fetchRoute(startplaceCord, destplaceCord, mapboxToken)
          .then(route => {
              drawRoute(route, map);
          })
          .catch(error => {
              console.error('Error fetching route:', error);
          });
  }

    return () => map.remove();
}, [startplaceCord, destplaceCord, mapInitialized]);

const fetchRoute = async (start, end, token) => {
  console.log("start",start,"end",end,"token",token);
  const response = await fetch(https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${start[0]+0.01},${start[1]+0.01}?geometries=geojson&steps=true&access_token=${token});
  const data = await response.json();
  return data.routes[0];
};

const drawRoute = (route, map) => {

  console.log("Route:", route);
  console.log("map",map);
  if (!route || !route.geometry) {
    console.error('Route or geometry is undefined');
    return;
  }

  // Add pointer for starting point
  new mapboxgl.Marker()
  .setLngLat(startplaceCord)
  .addTo(map);

// Add pointer for ending point
new mapboxgl.Marker()
  .setLngLat(destplaceCord)
  .addTo(map);

  const coordinates = route.geometry.coordinates;
  console.log(coordinates);
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3887be',
      'line-width': 5,
      'line-opacity': 0.75
    }
  });

};

    console.log(rideHistory);

    const formatTime = (createdAt) => {
      const formattedTime = (new Date(createdAt)).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      return formattedTime;
  };

  const handleChat = () => {
    navigate('/chat');
  }

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <Sidebar />
    <div class="container">
      <div className="box border border-3 border-dark rounded m-3 text-dark" >
      {rideHistory && rideHistory.map(ride => (
                <div key={ride.id} className='ride-details border-dark'>
                     {ride.isAccepted===false && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-warning '>Waiting for Driver confirmation!!.. Confirm OTP :- {ride.rideOtp}</p>}
                     {ride.isAccepted===false && ride.isRejected===true && ride.isCompleted===false && <p className='fw-bold text-danger '>Driver rejected Ride!.. The amount deducted will be credited back..</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===false && <><p className='fw-bold text-primary '>Driver on the way!.. Confirm OTP :- {ride.rideOtp}</p>
                     <button onClick={handleChat} className='btn btn-primary btn-md'>Chat with driver</button>
                     <div ref={mapContainerRef} style={{ width: '75%', height: '300px' }} />
                     {/* <button className='btn btn-primary btn-md' onClick={handleTrack}>Track</button> */}
                     </>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===true && <>
                      <p className='fw-bold text-success '>Hope you enjoyed Ride!.. Come back soon..</p>
                      {/* <button className='btn btn-primary btn-md' onClick={handleReview}>Review</button> */}
                     </>}
                    
                    <p>Ride ID: {ride.id}</p>
                    <p>From: {ride.rideFrom}</p>
                    <p>To: {ride.rideTo}</p>
                    {/* <p>{ride.rideOtp}</p> */}
                    <p>Driver: {ride.rideDriver}</p>
                    <p>Booking Time : {formatTime(ride.createdAt)}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
       
        <div className="btns p-2">
          {/* <button className='btn btn-primary btn-md'>Details</button> */}
          {/* <button className='btn btn-primary btn-md ml-2'>Subscribe</button> */}
        </div>
      </div>
    </div>

    </div>
    </>
  )
}

export default RideDetails;

import React, { useState, useEffect } from 'react';
import './DriverSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCab, faCar, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const DriverSidebar = () => {

	const [ chat,setChat] = useState(false);
	const { driverInfo } = useSelector((state)=>state.driver);
	// console.log(driverInfo);

	const socket = io('http://localhost:5000');

	useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat(true);
        });
    });

  return (
			<nav id="sidebar" className="img" style={{height:'100%'}}>
				<div className="p-4">
		  		<h1><a  class="logo">Hey Driver <span>Drive safe as Safety of passengers is in your hands !!!</span></a></h1>
	        <ul class="list-unstyled components mb-5">
            <li >
	            <Link><FontAwesomeIcon icon={faBars} className="fa-lg me-3 fa-fw" /></Link>
	          </li>
	          <li >
	            <Link to='/driverprofile'><FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" /> Info</Link>
	          </li>
			  {driverInfo && driverInfo.isApproved===true ? (
				<>
			  <li>
              <Link to='/drivervehicle'><FontAwesomeIcon icon={faCab} className="fa-lg me-3 fa-fw" /> Vehicle Info</Link>
	          </li>
	          <li>
              <Link to='/driverrides'><FontAwesomeIcon icon={faCar} className="fa-lg me-3 fa-fw" /> Rides</Link>
	          </li>
			  <li>
              <Link to='/driverchat'><FontAwesomeIcon icon={faPen} className="fa-lg me-3 fa-fw" /> Chats
			  {chat && <span className="notification-dot m-2 text-danger">1</span>}
			  </Link>
	          </li>
			  </>
			  ) : (
				<li></li>
			  )}
	          
	        </ul>

	      </div>
    	</nav>
  )
}

export default DriverSidebar;