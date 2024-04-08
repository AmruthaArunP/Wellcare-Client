import React from "react";
import UserSideBar from "../../components/userComponents/UserSideBar";
import UserProfile from "../../components/userComponents/UserProfile";
import UserAppoinment from "../../components/userComponents/UserAppoinment";
import UserPrescriptions from "../../components/userComponents/UserPrescriptions";

function UserBasePage({ value }) {
  return (
    <>
      <div className=" max-w-screen h-screen flex flex-wrap  ">
        <div className="w-full lg:w-1/5 max-h-screen text-center p-4 h-4/5">
          <UserSideBar />
        </div>
        <div className="w-full lg:w-4/5 max-h-screen px-4 py-4 flex flex-col">
          
            {value === "userProfile" && <UserProfile />}
            {value === "userAppoinment" && <UserAppoinment />}
            {value === "userPrescription" && <UserPrescriptions />}
          
        </div>
      </div>
    </>
  );
}

export default UserBasePage;
