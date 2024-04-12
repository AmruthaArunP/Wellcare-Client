import { useCallback, useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
// import DownloadButton from './download';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/hooks/useAuth.js';

function Prescription() {

  const history = useNavigate()
  const userData = useSelector(state => state.user.data)
  const [prescriptions, setPrescriptions] = useState([])
  const userToken = localStorage.getItem('userToken')
  const { setUser } = useAuth()

  const dataCall = useCallback(async () => {
    try {
      const response = await axios.get('prescriptions', );
      if (response.data === 'blocked') {
        history('/login')
        localStorage.removeItem('userToken')
        setUser(false);
      } else {
        console.log(response.data);
        setPrescriptions(response.data)
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  }, [history, userToken]);

  useEffect(() => {
    dataCall();
  }, [dataCall]);

  return (
    <div className="text-center p-3 m-5 border rounded-lg shadow-lg ">
      <h2 className="text-center text-4xl text-teal-600 font-bold mb-4 underline">Prescriptions</h2>
      {prescriptions.length !== 0 && prescriptions.map((el, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg mb-4">
          <div className="p-4 md:flex justify-between items-center">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold">{el.docData[0].name}</h4>
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
  );
}

export default Prescription;
