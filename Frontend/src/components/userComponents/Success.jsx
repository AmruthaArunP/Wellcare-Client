import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
    return clearTimeout();
  });

  return (
  <>
      <div className="flex justify-center items-center max-w-screen-md mx-auto bg-teal-100 m-6">
      <div className="text-center w-full h-48 p-4">
        <TiTick className="w-12 h-12 mx-auto text-green-500 border rounded-full bg-white" />
        <h4 className="text-xl font-bold">
          Successfully Registered Your Appointment.
        </h4>
        <p className="mt-2">Please check the schedule. </p>
        <p>Please Be On Time.</p>
        <p>Thank You.</p>
      </div>
    </div>
    </>

  );
}

export default Success;
