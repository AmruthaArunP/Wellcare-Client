import React, { useEffect, useState, useCallback } from "react";
import doctorAxios from "../../services/doctorAxiosInterceptor.js";
import { setSlot } from "../../redux/consult.js";
import { setData } from "../../redux/prescriptionData.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socket/socketProvider.jsx";
import { format } from "date-fns";

function DocConsultation() {
  const doctorToken = localStorage.getItem("doctorToken");
  const [consult, setConsult] = useState([]);
  const [ chat,setChat] = useState(false);
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem('doctorEmail')
  console.log("DocConsultation => INIT => dr email is:", email);


  useEffect(() => {
    socket.on("SentUpdatedMessage", (updatedMessage) => {
      console.log("updatedMessage", updatedMessage)
      setChat(true);
    });
  },[socket])

  useEffect(() => {
    const datacall = async () => {
      try {
        const appointData = await doctorAxios.get("doctor/consult");

        if (appointData.data) {
          const sortedAppointments = appointData.data.sort((a, b) => {
            // Convert dates to Date objects for comparison
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            // Compare dates
            return dateB - dateA;
          });
          // Filter and update the consult data to include the "expired" status
          const updatedConsult = sortedAppointments.map((el) => {
            const date = new Date();
            const formattedDate = format(date, "dd-MM-yyyy");
            //console.log(formattedDate);
            // Format the time
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? "PM" : "AM";

            // Convert hours to 12-hour format
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

            // Pad minutes with leading zeros
            const formattedMinutes = minutes.toString().padStart(2, "0");

            const currentTime = `${formattedHours}.${formattedMinutes} ${period}`;
            // Compare the indices to check if the appointment has already passed
            const isExpired = formattedDate >= el.date && el.time < currentTime;

            // Return the updated element with the "isExpired" status
            return {
              ...el,
              isExpired: isExpired,
            };
          });
          //console.log("consultation :", appointData.data);
          setConsult(updatedConsult);
        }
      } catch (error) {
        console.log(error);
      }
    };
    datacall();
  }, [doctorToken]);

  const handlePrescribe = useCallback(
    (el) => {
      //console.log("element to prescription*****:", el);
      dispatch(setData(el));
      navigate("/doctor-prscription");
    },
    [dispatch, navigate]
  );

  const handleJoin = useCallback((id, room) => {
      console.log("DR handleJoin => room is :", room, ", email: ", email);
      console.log('DR handleJoin => socket: ', socket );

      if(!socket.connected) {
          //socket.on("room:join", handleJoinRoom);
          socket.connect(room);
          console.log('DR handleJoin => socket after connect: ', socket );
      }
      socket.emit("room:join", { email, room });
      dispatch(setSlot(id));
    },
    [dispatch,email]
  );

  const handleJoinRoom = useCallback((data) => {
      const room  = data.room;
      console.log("DR handleJoinRoom => entered with data: ", data );  

      // navigate(`/doctor-call/${room}`);
      navigate(`/doctor-new-call/${room}`);
    },[navigate]
  );

  useEffect(() => {
    console.log("useEffect DR => data reached startng of useEffect");
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  //chat

const handleChat = (appoinmentId, userId) => {
  const appmtId = appoinmentId;
  const usrId = userId;
  navigate('/doctor-chat', { state : { appmtId, usrId}})
}

  return (
    <>
      <div className="appoints text-center sm:p-0 p-3 sm:m-0 m-5 border rounded-lg shadow-lg bg-white  ">
        <h2 className="text-center text-3xl md:text-4xl text-teal-600 font-bold mb-4 underline ">
          Consult Page
        </h2>
        <br />
        <div className="bg-white p-1 md:p-3">
          {consult.length !== 0 ? (
            consult.map((el) => (
              <div
                className="appointCard text-center border rounded-lg shadow-lg mx-4 my-4 p-4 bg-gray-100"
                key={el._id}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:text-left">
                    <h4 className="font-bold text-teal-600">
                      {el.userData[0].userName}
                    </h4>
                    <p className="text-sm">Date: {el.date}</p>
                    <p className="text-sm">Time: {el.time}</p>
                  </div>
                  <div className="col-span-2 flex justify-center items-center gap-4">
                    {el.isExpired ? (
                      <p className="text-sm text-red-500">Expired</p>
                    ) : el.isAttended ? (
                      <p className="text-sm">Attended</p>
                    ) : !el.isCancelled ? (
                      <>
                      <div>
                      <button
                          className="btn bg-green-500 text-white px-3 py-1 text-sm rounded-md mr-2"
                          onClick={() => handleJoin(el._id, el._id + el.user)}
                        >
                          Join
                        </button>
                        <button
                          className=" bg-green-500 text-white px-3 py-1 text-sm rounded-md mr-2"
                          onClick={() => handleChat(el._id , el.user )}
                        >
                          Chat {chat && <span className="text-white bg-red-600  border rounded">1</span>}
                        </button>

                      </div>

                        
                        <br />
                      </>
                    ) : (
                      <p className="text-sm text-red-500">Cancelled</p>
                    )}

                    {!el.medicines ? (
                      (!el.isCancelled && !el.isExpired && el.isAttended) ? (
                        <button
                          className="btn bg-teal-500 text-white px-3 py-1 text-sm rounded-md mr-2"
                          style={{ fontSize: "14px" }}
                          onClick={() => handlePrescribe(el)}
                        >
                          Prescribe
                        </button>
                      ) : (
                        ""
                      )
                    ) : (
                      <span className="text-sm">Prescription added</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DocConsultation;
