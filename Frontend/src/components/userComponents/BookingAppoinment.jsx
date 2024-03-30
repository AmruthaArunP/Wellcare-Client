import React, { useEffect, useState } from "react";
import axios from '../../services/axiosInterceptor.js'
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import {setAppointment} from '../../redux/appoinmentData.js'
import { useNavigate } from "react-router-dom";


function BookingAppointment() {

  const userData = useSelector((state) => state.user.data);
  const docData = useSelector((state) => state.selectedDoctor.doc);

  const [schedule, setSchedule] = useState([]);
  const [issues, setIssues] = useState("");
  const [sessionDate, setSessionDate] = useState(new Date());
  const [sessionTime, setSessionTime] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [timeList, setTimeList] = useState(['No data']);

  const userToken = localStorage.getItem('userToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const dataCall = async () =>{
        const response = await axios.get(`docSchedule/${docData._id}`,{
            headers: {
                Authorization: `Bearer ${userToken}`,
              },  
        })
        if(response.data === 'blocked'){
          navigate('/login');
          localStorage.removeItem('userToken');
        }else{
          console.log('schedule data:', response.data);
          setSchedule(response.data)
        }
    }
    dataCall()
  },[docData._id, userToken])


  const handleDateChange = (date) => {
    setSessionDate(date);
    const formattedDate = format(date, 'dd-MM-yyyy');
    console.log("date is:",formattedDate);
    

    const list = schedule.filter(
        (el) => el.date === formattedDate
      );
      console.log('list is:',list);
      if (list.length > 0 && list[0].time) {
        console.log(list[0].time);
        setTimeList(list[0].time);
      } else {
          setTimeList(['No available time for this day']);
        console.error('Error: Could not find time for the selected date');
      }

  }

  const handleTimeSelection = (time) => {
    setSessionTime(time);
  };

  const handleSubmit = async () => {
    if (sessionDate === '' || sessionTime === 'Time') {
      setErrMsg('Please select session date and time');
    } else {

      const data = {
        doctor: docData._id,
        user: userData._id,
        date: format(sessionDate, 'dd-MM-yyyy'),
        time: sessionTime,
        issues: issues,
        fee: docData.fee,
      };
      dispatch(setAppointment(data));
      navigate('/payment-details');
    }
  };

  
  return (
    <div className="max-w-screen mx-auto p-4 bg-gray-100 ">
      <h2 className="text-center text-teal-500 text-3xl md:text-4xl lg:text-4xl font-bold mb-8">
        Book your appointment
      </h2>
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-1/2 m-4 p-4 bg-teal-100 rounded-lg shadow-md">
          <h3 className="text-center text-xl md:text-3xl font-semibold mb-4 text-teal-500 font-bold">
            Patient Details
          </h3>

          <div className="w-full mx-auto">
            <p className="text-lg font-semibold">
              Name: <span className="">{userData.userName}</span>
            </p>
            <p className="text-lg font-semibold">
              Age: {userData.age}
            </p>
            <p className="text-lg font-semibold">
              Gender: {userData.gender}
            </p>
            <p className="text-lg font-semibold">
              Address: {userData.address}
            </p>
            <div className="flex flex-col mt-4">
              <label htmlFor="healthIssues" className="font-bold text-lg">
                Health issues:
              </label>
              <textarea
                id="healthIssues"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Enter your health issues here..."
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 m-4 p-4 bg-teal-100 rounded-lg shadow-md">
          <h3 className="text-center text-xl md:text-3xl font-semibold mb-4 text-teal-500 font-bold">
            Doctor Details
          </h3>

          <div className="w-full mx-auto">
            <p className="text-lg font-semibold">
              Name: Dr.{docData.name}
            </p>
            <p className="text-lg font-semibold">
              Specialization: {docData.qualification}
            </p>
            <p className="text-lg font-semibold">
              Fees: {docData.fee}
            </p>
            <div className="mt-4">
              <p className="text-lg font-semibold text-center text-teal-500">
                Session Timing
              </p>
              <div className="flex items-center justify-center mt-4">
                <p className="text-lg font-semibold">Choose date:</p>
                <DatePicker
                  className="border-2 rounded text-center ml-2"
                  selected={sessionDate}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Available timings:</p>
              <div className="flex flex-wrap justify-center mt-2">
                {timeList.map((time, index) => (
                  <button key={index} className="bg-teal-500 text-white px-4 py-2 rounded-lg mr-4 mb-2"
                  onClick={() => handleTimeSelection(time)}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4 mx-6">
        <button className="border rounded p-4 bg-teal-500 font-bold text-xl text-white" onClick={handleSubmit}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default BookingAppointment;
