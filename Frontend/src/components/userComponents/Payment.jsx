import React ,{useEffect, useState} from 'react';
import axios from '../../services/axiosInterceptor.js'
import { useSelector } from 'react-redux';
import { displayRazorpay } from './razorpayConfig';
import { useNavigate } from 'react-router-dom';

function Payment() {
  
    const appData = useSelector(state => state.appointment.appointment);
    const amount = appData.fee + (appData.fee * 0.1);

    const [err, setErr] = useState()

    const navigate = useNavigate()

    useEffect(() => {
      if (!appData || isNaN(appData.fee)) {
          history('/findDoctors')
      }
  })

  const handlePayment = async () => {
    try {
      const payment = await displayRazorpay(amount, appData);
      if(payment === 'slot unavailable'){
        setErr(payment)
        setTimeout(() => {
          setErr('')
        },4000)
      }else{
        if(payment){
          const response = await axios.post('bookSlot',appData,)
          if(response.data === 'success'){
            navigate('/success-page')
          }else if (res.data == 'blocked') {
            history('/login')
            localStorage.removeItem('userToken')
        }
        }else{
          console.log('payment error');
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

    return (
        <div className="max-w-screen-md m-8 mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-teal-500 font-bold text-center text-3xl py-4 underline">Payment Details</h2>

            <div className="flex flex-col md:flex-row w-full mx-auto flex-wrap p-4">
                <div className="w-full md:w-1/2 p-4">
                    <div className="text-lg font-bold">
                        <p className="mb-2">Service</p>
                        <p className="mb-2">Date</p>
                        <p className="mb-2">Time</p>
                        <p className="mb-2">Consultation Fee</p>
                        <p className="mb-2">Platform Fee</p>
                        <p className="mb-2">Total Payable</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <div className="text-lg">
                        <p className="mb-2">: Online Consulting</p>
                        <p className="mb-2">: {appData.date}</p>
                        <p className="mb-2">: {appData.time}</p>
                        <p className="mb-2">: Rs.{appData.fee}</p>
                        <p className="mb-2">: Rs.{appData.fee * 0.1}</p>
                        <p className="mb-2">: Rs.{amount}/-</p>
                    </div>
                </div >
                <div className='w-full text-center m-8'>
                <button className='bg-teal-500 px-8 py-2 rounded font-bold text-white text-center '
                onClick={handlePayment}>Pay now</button>
                </div>
            </div>

        </div>
    );
}

export default Payment;
