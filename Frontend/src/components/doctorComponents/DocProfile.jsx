import React, { useEffect, useState } from 'react';
import doctorAxios from '../../services/doctorAxiosInterceptor.js';
import { useNavigate } from 'react-router-dom';
import { setDoctorData } from '../../redux/doctorData.js';
import { useDispatch } from 'react-redux';

function DocProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorToken = localStorage.getItem('doctorToken');
  const [doctorData, setDoctorDataLocal] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await doctorAxios.get('doctor/getDoctorProfile');
        if (response.data) {
          setDoctorDataLocal(response.data);
          dispatch(setDoctorData(response.data));
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [dispatch, doctorToken]);

  const handleUpdate = () => {
    navigate('/update-doctor-profile', { state: { doctorData } });
  };

  const handleChangePassword = () => {
    navigate(`/doctor-reset-password/${doctorData[0].email}`);
  };

  return (
    <div className="container mx-auto px-4">
      {doctorData && (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-center  text-teal-600 font-bold mb-4 ">
            <span className='text-4xl'>Doctor Profile -{' '}</span>
            {doctorData[0]?.isApproved === 'approved' ? (
              <span className="text-green-600 text-2xl ">Approved </span>
            ) : doctorData[0]?.isApproved === 'rejected' ? (
              <span className="text-red-600 text-2xl">Rejected - {doctorData[0].blockReason}</span>
            ) : (
              <span className="text-yellow-600">Pending Approval - please update your profile</span>
            )}
            {
              doctorData[0]?.isBlocked ? (
                <span className="text-red-600 text-2xl">-Blocked</span>
              ) : ("")
            }
          </p>
        </div>
      
      )}


      {doctorData ? (
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="w-full md:w-1/2">
            <img
              src={`https://wellcarehealth.online/images/${doctorData[0].image}`}
              alt="Doctor"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 border-2 rounded-lg p-6 bg-white shadow-lg">
            <div className="mb-4">
              <span className="font-bold text-xl">Name:</span> {doctorData[0].name}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Age:</span> {doctorData[0].age}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Email:</span> {doctorData[0].email}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Contact:</span> {doctorData[0].contact}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Gender:</span> {doctorData[0].gender || 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Consultation Fee:</span> {doctorData[0].fee || 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Address:</span> {doctorData[0].address || 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Department:</span> {doctorData[0].department || 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Qualification:</span> {doctorData[0].qualification || 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Documents:</span>
              <div className="mt-2 flex flex-wrap">
                {doctorData[0].documents &&
                  doctorData[0].documents.map((document, index) => (
                    <div key={index} className="mr-2 mb-2">
                      <img
                        src={`http://localhost:8000/images/${document}`}
                        alt={`Document ${index}`}
                        className="w-24 h-24 rounded-lg shadow-md"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
              <button
                className="text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">No doctor data available</div>
      )}
    </div>
  );
}

export default DocProfile;
