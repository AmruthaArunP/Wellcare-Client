import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import { useNavigate } from 'react-router-dom';
import { setUserdata } from '../../redux/userData.js';
import { useDispatch } from 'react-redux';

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');

  const handleUpdate = () => {
    
    navigate('/update-user-profile');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get('getUserProfile' );
        if (response.data) {
          console.log('after fetching response in user profile- data',response.data);
          setUser(response.data);
          console.log("user data after fetching:",user);
          dispatch(setUserdata(response.data[0]));
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleChangePassword = () => {
    navigate(`/reset-password/${user[0].email}`)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center mt-8 mx-auto">
        <p className="text-center text-4xl text-teal-600 font-bold mb-4 underline">
          User Profile -{' '}
          {user[0]?.isBlocked ? (
            <span className="text-red-500 ">blocked</span>
          ) : (
            <span className="text-green-500 text-md">verified</span>
          )}
        </p>
      </div>
      {user ? (
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="w-full md:w-1/2  bg-red-200 rounded-md overflow-hidden shadow-md">
            {user[0].image ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}images/${user[0].image}`}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-full md:w-1/2 border-2 sm:w-full rounded-md px-8 py-6 shadow-md">
            <div className="mb-4">
              <span className="font-bold text-xl">Name:</span> {user[0].userName}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Age:</span> {user[0].age}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Email:</span> {user[0].email}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Contact:</span> {user[0].contact}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Gender:</span> {user[0].gender ? user[0].gender : 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Address:</span> {user[0].address ? user[0].address : 'Nill'}
            </div>
            <div className="mb-4">
              <span className="font-bold text-xl">Documents:</span>
              {user[0].documents &&
                user[0].documents.map((document, index) => (
                  <div key={index} className="mt-2">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}images/${document}`}
                      alt={`Document ${index}`}
                      className="w-32 h-32 inline-block mr-2"
                    />
                  </div>
                ))}
              <div className="mt-2">{/* Space for newly uploaded images */}</div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
              <button
                className="text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleChangePassword}>
                Change password
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default UserProfile;
