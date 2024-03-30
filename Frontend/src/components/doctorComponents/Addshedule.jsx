import React, { useState } from "react";
import axios from '../../services/axiosInterceptor.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setScheduleData } from "../../redux/doctorSchedule.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';



function Addshedule() {
  const [freeDate, setFreeDate] = useState(new Date());
  const [freeTime, setFreeTime] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const doctorToken = localStorage.getItem('doctorToken');
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const timeSlots = [
    "8.00 AM",
    "8.30 AM",
    "9.00 AM",
    "9.30 AM",
    "10.00 AM",
    "10.30 AM",
    "11.00 AM",
    "11.30 AM",
    "12.00 PM",
    "12.30 PM",
    "12.45 PM",
    "1.00 PM",
    "1.30 PM",
    "2.00 PM",
    "2.30 PM",
    "3.00 PM",
    "3.30 PM",
    "3.54 PM",
    "4.00 PM",
    "4.21 PM",
     "4.30 PM",
    "5.00 PM",
    "5.36 PM",
    "5.30 PM",
    "6.00 PM",
    "6.30 PM",
    "7.00 PM",
    "7.30 PM",
    "8.00 PM",
    "8.30 PM",
    "9.00 PM",
    "9.30 PM",
    "10.00 PM",
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTimeSelection = async (e) => {
    const selectedTime = e.target.value;
    if (e.target.checked) {
      setFreeTime((prevFreeTime) => [...prevFreeTime, selectedTime]);
    } else {
      setFreeTime((prevFreeTime) =>
        prevFreeTime.filter((time) => time !== selectedTime)
      );
    }

  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    if(!freeTime.length || !freeDate){
        setMsg('Please Select time and date')
        setTimeout(() => {
            setMsg('')
        },3000)
        return
    }
    // const formatedDate = `${freeDate.getDate()}-${freeDate.getMonth()+1}-${freeDate.getFullYear()}`;
    // const formatedTime = `${freeDate.getHours()}:${freeDate.getMinutes()}`;
    const formatedDate = format(freeDate, 'dd-MM-yyyy');
   

    try {
        const response = await axios.post('doctor/addSchedule',
    {date: formatedDate, time:freeTime, action: e.target.value},
    {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      }
    )
    if(response.data){     
        setMsg('Schedule updated successfully')
        dispatch(setScheduleData(response.data.updatedSchedule))
        navigate('/doctor-timeSchedule')
        setTimeout(() => {
            setMsg('')
        },3000);
        return
      
    }else{
        setMsg('Something went wrong')
        setTimeout(() => {
            setMsg('')
        },3000);
        return
    }
    } catch (error) {
        console.error('Error setting doctor schedule:', error);
    }

    
  }

  return (
    <>
      <div className="w-full px-4">
        <h2 className="text-4xl text-teal-600 font-bold mb-4 underline text-center">
          My schedule
        </h2>
        {msg === 'Please select date and time' || msg === 'Something went wrong' ? (
            <div className="text-red-500">{msg}</div>
          ) : !msg ? (
            ''
          ) : (
            <div className="text-red-500">{msg}</div>
          )}
        
        <br />
        <div className="flex w-full flex-col md:flex-row md:justify-center  gap-10">
          <div className="mb-4 md:mb-0 w-1/3 ">
            <p className="mb-2 text-lg font-bold text-teal-500">Choose Date:</p>
            <DatePicker
              selected={freeDate}
              onChange={(date) => setFreeDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="border-2 rounded p-2 text-teal-500"
            />
          </div>

          <div className="relative  w-1/3">
            <button
              onClick={handleToggle}
              className="font-bold bg-teal-500 text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Slot
            </button>
            <ul
              className={`dropdown-menu absolute ${
                isOpen ? "block" : "hidden"
              } text-gray-700 pt-1`}
            >
              {timeSlots.map((el) => (
                <li
                  key={el}
                  className="bg-white rounded py-2 px-4 hover:bg-gray-100"
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      value={el}
                      onChange={handleTimeSelection}
                    />
                    <span className="ml-2">{el}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/3">
            <button 
            className="font-bold bg-teal-500 text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
            onClick={handleSchedule}
            value={'add'}>
              Add Timings
            </button>
          </div>
        </div>
        <br />
        <div className="max-w-200px flex">
          <span className="text-teal-600 font-bold ">Selected Time : </span>{" "}
          {freeTime.map((el, index) => (
            <span key={index} className="inline-block">
              {el},
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Addshedule;
