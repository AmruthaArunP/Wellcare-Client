import React, { useEffect, useState } from "react";
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import { setScheduleData } from "../../redux/doctorSchedule.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/hooks/useAuth.js";


function DocSchedule() {

  const navigete = useNavigate()
  const dispatch = useDispatch()
  const scheduleList = useSelector((state) => state.docSchedule.schedule);
  const doctorToken = localStorage.getItem('doctorToken');
  const [msg , setMsg] = useState('')
  const { setDoctor } = useAuth();


  const hanbleAddButton = () => {
    navigete('/add-schedule-timings')
  }

  const removeSlot = async (e) => {
     try {
      e.preventDefault();
      const data = e.target.value.split('_');
      const response = await doctorAxios.post('doctor/removeSchedule',
      {date : data[0], time : data[1], action : 'remove'})
      if(response.data){ 
        console.log("comming data");    
        setMsg('Schedule updated successfully')
        dispatch(setScheduleData(response.data.updatedSchedule))
        setTimeout(() => {
            setMsg('')
        },3000);
        return
      
    }
     } catch (error) {
      console.error('Error setting doctor schedule:', error);
     }
  }

  useEffect(() => {
    const dataCall = async () => {
      const response = await doctorAxios.get('doctor/getSchedule')
      if( response.data === 'blocked'){
        localStorage.removeItem('doctorToken')
        setDoctor(false);
        navigete('/doctor-login',{ state: { errorMsg: 'User is blocked' } })
        setErrorMsg('user is blocked')
      }else {
        const currentDate = new Date();
        console.log('getting:', response.data);
        dispatch(setScheduleData(response.data))
      }
    }
    dataCall();
  }, [dispatch, doctorToken]);
  
  return (
    <div>
      <div className="w-full flex flex-wrap px-4 justify-between  gap-20">
        <h2 className="text-4xl text-teal-600 font-bold mb-4 underline text-center mx-4">My schedule</h2>
        <button className="text-white font-bold text-lg border py-2 px-4 rounded bg-teal-500 mx-4" onClick={hanbleAddButton}>
          Add Timings
        </button>
      </div>
      { msg && <span className="text-red-500">{msg}</span>}

      {scheduleList && scheduleList.length > 0 ? (
        scheduleList.map((schedule, index) => (
          <div key={index} className="m-3 p-3 bg-white rounded-lg shadow-md">
            <div>
              <b className="text-lg text-teal-600">Date:</b>
              <span className="text-gray-700 ml-1 font-bold">{schedule.date}</span>
            </div>
            <div>
              <h5 className="text-lg font-bold mt-2 text-teal-600">Time Slots:</h5>
              <div className="flex flex-wrap">
                {schedule.time.map((time) => (
                  <div key={time} className="btn py-1 px-2 m-2 bg-teal-500 text-white rounded-lg flex items-center">
                    {time}
                    <button
                      className="btn ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                      value={schedule.date + '_' + time}
                      onClick={removeSlot} 
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No schedule data available</div>
      )}
    </div>
  );
}

export default DocSchedule;
