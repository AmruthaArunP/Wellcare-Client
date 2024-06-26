import React from "react";
import UserSideBar from "../../components/userComponents/UserSideBar";
import UserProfile from "../../components/userComponents/UserProfile";
import UserAppoinment from "../../components/userComponents/UserAppoinment";
import UserPrescriptions from "../../components/userComponents/UserPrescriptions";

function UserBasePage({ value }) {
  return (
    <>
      <div className="max-w-screen flex flex-wrap flex-row">
        <div className="w-full lg:w-1/5 text-center p-4 h-4/5">
          <UserSideBar />
        </div>
        <div className="w-full lg:w-4/5 px-4 py-4 flex flex-col">
          <div className="flex-grow border rounded-lg shadow-lg p-10 overflow-y-auto">
            {value === "userProfile" && <UserProfile />}
            {value === "userAppoinment" && <UserAppoinment />}
            {value === "userPrescription" && <UserPrescriptions />}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBasePage;
