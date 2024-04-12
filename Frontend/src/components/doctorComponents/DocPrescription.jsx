import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import doctorAxios from '../../services/doctorAxiosInterceptor.js'
import useAuth from '../../context/hooks/useAuth.js'

function DocPrescription() {
  
  const navigate = useNavigate()
  const [prescriptions, setPrescriptions] = useState([])
  const doctorToken = localStorage.getItem('doctorToken')
  const { setDoctor } = useAuth()


  const handleCreateButton = () => {
    navigate('/doctor-createPrscription')
  }

  const dataCall = useCallback(async () => {
    try {
      const response = await doctorAxios.get('doctor/prescriptions', );
      if( response.data === 'blocked'){
        localStorage.removeItem('doctorToken')
        setDoctor(false);
        navigate('/doctor-login',{ state: { errorMsg: 'User is blocked' } })
        setErrorMsg('user is blocked')
      }else {
        console.log(response.data);
        setPrescriptions(response.data)
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  }, [navigate, doctorToken]);

  useEffect(() => {
    dataCall();
  }, [dataCall]);

  return (
    <div className='text-center p-3 m-5 border rounded-lg shadow-lg '>
      <div className="w-full flex flex-wrap px-4 justify-between  gap-20">
        <h2 className="text-4xl text-teal-600 font-bold mb-4 underline text-center mx-4">Prescriptions</h2>
        <button className="text-white font-bold text-lg border py-2 px-4 rounded bg-teal-500 mx-4" onClick={handleCreateButton} >
          Create Prescription
        </button>
      </div>
      {prescriptions.length !== 0 && prescriptions.map((el, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg mb-4">
          <div className="p-4 md:flex justify-between items-center">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold">{el.userData[0].userName}</h4>
              <p className="text-sm">{el.date}</p>
              <p className="text-sm">{el.time}</p>
            </div>
            <div className="md:w-1/3">
              {el.medicines && Object.entries(el.medicines).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="font-semibold">{key}:</span> {value}
                </div>
              ))}
            </div>
            <div className="md:w-1/3 flex justify-end">
              {/* {el.medicines && <DownloadButton el={el} user={userData} />} */}
            </div>
          </div><br/><br/>
        </div>
      ))}

    </div>
  )
}

export default DocPrescription
