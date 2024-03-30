import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../../services/axiosInterceptor.js";
import { setDoctorData } from "../../redux/doctorData.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ViewDetails({ user, setSelected, value }) {
  const adminToken = localStorage.getItem("adminToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reason, setReason] = useState(false);
  const [reasonText, setReasonText] = useState('');

  const handleApproveDoctor = async (doctorId, status) => {
    try {
      let result;
      if (status === "approved") {
        result = await Swal.fire({
          title: "Do you want to approve the doctor?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        });
      } else {
          result = await Swal.fire({
          title: "Do you want to reject the doctor?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        });
      }

      if (result.isConfirmed) {
        let response
        if(reason){
           response = await axios.patch(
            `admin/approveDoctor/${doctorId}`,
            { status, reasonText },
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
          setReason(false)
        }else{
           response = await axios.patch(
            `admin/approveDoctor/${doctorId}`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
        }
               

        if (response.data) {
          setSelected((prevUser) => ({
            ...prevUser,
            isApproved: status,
          }));
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
          });
          dispatch(setDoctorData(response.data.doctor));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="flex justify-between">
        <p className="text-3xl font-bold  text-center text-blue-400">
          <span className="text-blue-400 underline">
            {value === "doctor" ? ` Dr. ${user.name}` : user.userName}
          </span>
          {user.isBlocked && (
            <span className="text-red-500 text-2xl"> - Blocked</span>
          )}
          {value === "doctor" && (
            <>
              {user.isApproved === "approved" ? (
                <span className="text-green-500 text-xl">
                  {" "}
                  - Approved doctor
                </span>
              ) : user.isApproved === "rejected" ? (
                <span className="text-red-500 text-xl"> - Rejected doctor</span>
              ) : (
                <span className="text-yellow-500 text-xl">
                  {" "}
                  - Pending approval
                </span>
              )}
            </>
          )}
        </p>
        <div className="flex gap-4">
          {user.isBlocked !== true &&
            (user.isApproved === "rejected" ? (
              <button
                className="border rounded bg-green-500 py-2 px-4 font-bold text-xl"
                onClick={() => handleApproveDoctor(user._id, "approved")}
              >
                Approve Doctor
              </button>
            ) : (
              <button
                className="border rounded bg-red-600 py-2 px-4 font-bold text-xl"
                onClick={() => setReason(true)}
              >
                Reject Doctor
              </button>
            ))}

          <button
            className="bg-black text-white rounded px-4 py-2 font-bold"
            onClick={() => setSelected("")}
          >
            Back{" "}
          </button>
        </div>
      </div>
      <br />
      {reason && (
  <div className="mt-4 p-6 bg-slate-200 shadow-lg rounded-lg overflow-hidden">
    <label htmlFor="reason" className="text-red-500 font-bold text-xl mb-4">
      Reason for rejection:
    </label>
    <textarea
      id="reason"
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      rows="4"
      placeholder="Enter reason for rejection..."
      value={reasonText}
      onChange={(e) => setReasonText(e.target.value)}
    ></textarea>
    
    <button className="border rounded bg-red-600 py-2 px-4 font-bold text-xl mt-4" 
    onClick={() => handleApproveDoctor(user._id, "rejected")}
    >
      Submit
      </button>
  </div>
)}
<br />


      <div className="bg-slate-200 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between flex-wrap">
            <div className="font-bold text-xl mb-4">Personal Information</div>
            {user.image ? (
              <div className="">
                <img
                  src={`http://localhost:8000/images/${user.image}`}
                  alt="User"
                  className="w-32 h-32 rounded"
                />
              </div>
            ) : (
              <div className="">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                  alt="User"
                  className="w-32 h-32 rounded"
                />
              </div>
            )}
          </div>
          <br />

          <hr className="border-t border-gray-300 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 font-semibold mb-2">Name:</p>
              <p className="text-gray-600">
                {value === "patient" ? user.userName : user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-800 font-semibold mb-2">Age:</p>
              <p className="text-gray-600">{user.age}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Contact:</p>
              <p className="text-gray-600">{user.contact}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Address:</p>
              <p className="text-gray-600">{user.address}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Gender:</p>
              <p className="text-gray-600">{user.gender}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Qualificatin:</p>
              <p className="text-gray-600">{user.qualification}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Joining Date:</p>
              <p className="text-gray-600">{user.timeStamp}</p>
            </div>
          </div>
        </div>
      </div>

      {value === "doctor" && (
        <div className="bg-slate-200 shadow-lg rounded-lg mt-8 overflow-hidden">
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-4">
              Doctor Specific Information
            </div>
            <hr className="border-t border-gray-300 mb-6" />

            <div>
              <p className="text-gray-800 font-semibold mb-2">Department:</p>
              <p className="text-gray-600">{user.dept[0]?.name}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">
                Consultation Fee:
              </p>
              <p className="text-gray-600">{user.fee}</p>
            </div>
            <div className="">
              <div>
                <p className="text-gray-800 font-semibold mb-2">Documents:</p>
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex flex-col w-32 h-50">
                    <img
                      className="w-32 h-32"
                      src={`http://localhost:8000/images/${user.documents}`}
                      alt=""
                    />
                    <br />
                    <button className="border bg-green-300 rounded px-4 font-bold ">
                      Download image
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4">
                {value === "doctor" &&
                  !user.isBlocked &&
                  user.isApproved === "pending" && (
                    <>
                      <button
                        className="border rounded bg-green-500 py-2 px-4 font-bold text-xl"
                        onClick={() =>
                          handleApproveDoctor(user._id, "approved")
                        }
                      >
                        Approve Doctor
                      </button>
                      <button
                        className="border rounded bg-red-500 py-2 px-4 font-bold text-xl"
                        onClick={() =>
                          handleApproveDoctor(user._id, "rejected")
                        }
                      >
                        Reject Doctor
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails;
